import {
  AuthenticationBindings,
  AuthenticationStrategy,
} from '@loopback/authentication';
import {MyAuthenticationMetadata, SecuredType, Credentials} from '../types';
import {inject, Provider, ValueOrPromise} from '@loopback/core';
import {
  UserRepository,
  UserRoleRepository,
  RoleRepository,
} from '../../../repositories';
import {repository} from '@loopback/repository';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {User} from '../../../models';
import {HttpErrors} from '@loopback/rest';
import {StrategyAdapter} from '@loopback/authentication-passport';
import {RevokedTokenRepository} from '../../../repositories/revoked-token.repository';

export const JWT_STRATEGY_NAME = 'jwt';

// the strategy provider will parse the specifed strategy, and act accordingly
export class MyAuthAuthenticationStrategyProvider
  implements Provider<AuthenticationStrategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: MyAuthenticationMetadata,
    @repository(UserRepository) private userRepository: UserRepository,
    @repository(UserRoleRepository)
    private userRoleRepository: UserRoleRepository,
    @repository(RoleRepository)
    private roleRepository: RoleRepository,
    @repository(RevokedTokenRepository)
    private revokedTokenRepository: RevokedTokenRepository,
  ) {}

  value(): ValueOrPromise<AuthenticationStrategy | undefined> {
    if (!this.metadata) return;

    const {strategy} = this.metadata;
    if (strategy === JWT_STRATEGY_NAME) {
      const jwtStrategy = new JwtStrategy(
        {
          secretOrKey: process.env['JWT_SECRET'],
          jwtFromRequest: ExtractJwt.fromExtractors([
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            ExtractJwt.fromUrlQueryParameter('access_token'),
          ]),
        },
        (payload, done) => this.verifyToken(payload, done),
      );

      // we will use Loopback's  StrategyAdapter so we can leverage passport's strategy
      // and also we don't have to implement a new strategy adapter.
      return new StrategyAdapter(jwtStrategy, JWT_STRATEGY_NAME);
    }
  }

  // verify JWT token and decrypt the payload.
  // Then search user from database equals to payload's username.
  // if user is found, then verify its roles
  async verifyToken(
    payload: Credentials,
    done: (err: Error | null, user?: any | false, info?: Object) => void,
  ) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: payload.username,
        },
      });
      if (!user) {
        done(null, false);
      } else {
        await this.verifyRoles(user);

        done(null, {
          name: user.username,
          email: user.email,
          id: user.id as string,
        });
      }
    } catch (err) {
      if (err.name === 'UnauthorizedError') done(null, false);
      done(err, false);
    }
  }

  // verify user's role based on the SecuredType
  async verifyRoles(user: User) {
    const {type, roles} = this.metadata;

    if ([SecuredType.IS_AUTHENTICATED, SecuredType.PERMIT_ALL].includes(type))
      return;

    // convert role name to role-id list
    const roleIds: string[] = (
      await this.roleRepository.find({
        where: {
          name: {inq: roles},
        },
      })
    ).map(role => role.id as string);

    if (type === SecuredType.HAS_ANY_ROLE) {
      if (!roles.length) return;
      const {count} = await this.userRoleRepository.count({
        userId: user.id,
        roleId: {inq: roleIds},
      });

      if (count) return;
    } else if (type === SecuredType.HAS_ROLES && roles.length) {
      const userRoles = await this.userRoleRepository.find({
        where: {
          userId: user.id,
          roleId: {inq: roleIds},
        },
      });

      if (userRoles.length === roles.length) return;
    }

    throw new HttpErrors.Unauthorized('Invalid authorization');
  }
}
