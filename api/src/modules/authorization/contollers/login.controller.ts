import {post, requestBody, HttpErrors} from '@loopback/rest';
import {UserRepository, UserRoleRepository} from '../../../repositories';
import {repository, HasOneRepositoryFactory} from '@loopback/repository';
import {UserCredentials, User, AuthClient, RefreshToken} from '../../../models';
import {compare} from 'bcryptjs';
import {STATUS_CODE} from '../../../controllers/status-codes.enum';
import {CONTENT_TYPE} from '../../../controllers/content-type.constant';
import {LoginRequest} from '../models/login-request.dto';
import {AuthClientRepository} from '../../../repositories/user/auth-client.repository';
import {
  Credentials,
  ClientCredentials,
  ClientAuthCode,
  SecuredType,
} from '../types';
import {TokenResponse} from '../models/token-response.dto';
import {AuthUser} from '../models/auth-user.model';
import * as crypto from 'crypto';
import {RefreshTokenRepository} from '../../../repositories/user/refresh-token.repository';
import {secured} from '../decorators';
import {AuthTokenRequest} from '../models/auth-token-request.dto';
import {verify} from 'jsonwebtoken';
import {AuthRefreshTokenRequest} from '../models/auth-refresh-token-request.dto';
const {sign} = require('jsonwebtoken');

export class LoginController {
  public readonly credentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;

  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,
    @repository(UserRoleRepository)
    private userRoleRepository: UserRoleRepository,
    @repository(AuthClientRepository)
    private authClientRepository: AuthClientRepository,
    @repository(RefreshTokenRepository)
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  @secured(SecuredType.PERMIT_ALL)
  @post('/auth/token')
  async token(@requestBody() req: AuthTokenRequest) {
    const authClient = await this.authClientRepository.findOne({
      where: {
        clientId: req.clientId,
      },
    });
    if (!authClient) {
      throw new HttpErrors.Unauthorized('ClientInvalid');
    }
    try {
      const payload: ClientAuthCode<User> = verify(
        req.code,
        authClient.secret,
        {
          audience: req.clientId,
          subject: req.username,
          issuer: process.env['JWT_ISSUER'],
        },
      ) as ClientAuthCode<User>;

      return await this.createJWT(payload, authClient);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new HttpErrors.Unauthorized('CodeExpired');
        // eslint-disable-next-line no-prototype-builtins
      } else if (HttpErrors.HttpError.prototype.isPrototypeOf(error)) {
        throw error;
      } else {
        console.log(error);
        throw new HttpErrors.Unauthorized('InvalidCredentials');
      }
    }
  }

  @secured(SecuredType.PERMIT_ALL)
  @post('/auth/login', {
    responses: {
      [STATUS_CODE.OK]: {
        description: 'Auth Code',
        content: {
          [CONTENT_TYPE.JSON]: Object,
        },
      },
    },
  })
  async login(@requestBody() req: LoginRequest): Promise<{code: string}> {
    if (!req.client_id) {
      throw new HttpErrors.Unauthorized('ClientIdMissing');
    }
    if (!req.client_secret) {
      throw new HttpErrors.BadRequest('ClientSecretMissing');
    }

    const user = await this.verifyUser({
      password: req.password,
      username: req.username,
    });

    const authClient = await this.verifyClient({
      clientId: req.client_id,
      clientSecret: req.client_secret,
    });

    try {
      const codePayload = {
        clientId: req.client_id,
        userId: user.id,
      };
      const token = sign(codePayload, authClient.secret, {
        expiresIn: authClient.authCodeExpiration,
        audience: req.client_id,
        subject: req.username,
        issuer: process.env.JWT_ISSUER,
      });
      return {
        code: token,
      };
    } catch (error) {
      throw new HttpErrors.InternalServerError('InvalidCredentials');
    }
  }

  @secured(SecuredType.PERMIT_ALL)
  @post('/auth/token-refresh', {
    responses: {
      [STATUS_CODE.OK]: {
        description: 'Token Response',
        content: {
          [CONTENT_TYPE.JSON]: {
            schema: {'x-ts-type': TokenResponse},
          },
        },
      },
    },
  })
  async exchangeToken(
    @requestBody() req: AuthRefreshTokenRequest,
  ): Promise<TokenResponse> {
    const refreshPayload: RefreshToken = await this.refreshTokenRepository.get(
      req.refreshToken,
    );
    if (!refreshPayload) {
      throw new HttpErrors.Unauthorized('TokenExpired');
    }
    const authClient = await this.authClientRepository.findOne({
      where: {
        clientId: refreshPayload.clientId,
      },
    });
    if (!authClient) {
      throw new HttpErrors.Unauthorized('ClientInvalid');
    }
    return this.createJWT(
      {clientId: refreshPayload.clientId, userId: refreshPayload.userId},
      authClient,
    );
  }

  private async verifyUser(credentials: Credentials) {
    const user = await this.userRepository.findOne({
      where: {username: credentials.username},
    });
    if (!user) throw new HttpErrors.Unauthorized('UserNotFound');
    // client secret d§kd8fh!
    const userCreds = await this.userRepository.credentials(user.id).get();
    const isPasswordMatched = await compare(
      credentials.password,
      userCreds.password,
    );
    if (!isPasswordMatched)
      throw new HttpErrors.Unauthorized('Invalid credentials');

    const roles = await this.userRoleRepository.find({
      where: {userId: user.id},
    });
    const {id, email} = user;

    return {
      id: id as string,
      email,
      roles: roles.map(r => r.roleId),
    };
  }

  private async verifyClient(credentials: ClientCredentials) {
    const authClient = await this.authClientRepository.findOne({
      where: {
        clientId: credentials.clientId,
      },
    });
    if (!authClient) {
      throw new HttpErrors.Unauthorized('ClientNotFound');
    }

    const isPasswordMatched = await compare(
      credentials.clientSecret,
      authClient.clientSecret,
    );
    if (!isPasswordMatched)
      throw new HttpErrors.Unauthorized('Invalid client credentials');

    return authClient;
  }

  private async createJWT(
    payload: ClientAuthCode<User>,
    authClient: AuthClient,
  ): Promise<TokenResponse> {
    try {
      let user: User | undefined;
      if (payload.user) {
        user = payload.user;
      } else if (payload.userId) {
        user = await this.userRepository.findById(payload.userId);
      }
      if (!user) {
        throw new HttpErrors.Unauthorized('UserDoesNotExist');
      }

      // Create user DTO for payload to JWT
      const authUser: AuthUser = new AuthUser(user);

      const roles = await this.userRoleRepository.find({
        where: {
          userId: authUser.id,
        },
      });
      // eslint-disable-next-line require-atomic-updates
      authUser.roles = [];
      for (const i in roles) {
        const _role = await this.userRoleRepository.role(roles[i].id);
        authUser.roles.push(_role.name);
      }
      const accessToken = sign(
        authUser.toJSON(),
        process.env.JWT_SECRET as string,
        {
          expiresIn: authClient.accessTokenExpiration,
          issuer: process.env.JWT_ISSUER,
        },
      );
      const size = 32,
        ms = 1000;
      const refreshToken: string = crypto.randomBytes(size).toString('hex');
      // Set refresh token into redis for later verification
      await this.refreshTokenRepository.set(
        refreshToken,
        {clientId: authClient.clientId, userId: user.id},
        {ttl: authClient.refreshTokenExpiration * ms},
      );
      return new TokenResponse({accessToken, refreshToken});
    } catch (error) {
      // eslint-disable-next-line no-prototype-builtins
      if (HttpErrors.HttpError.prototype.isPrototypeOf(error)) {
        throw error;
      } else {
        console.log(error);
        throw new HttpErrors.Unauthorized('InvalidCredentials');
      }
    }
  }
}
