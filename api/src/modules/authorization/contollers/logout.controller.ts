import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors, param, post, Request, RestBindings} from '@loopback/rest';

import {secured} from '../decorators';
import {SecuredType} from '../types';
import {RevokedTokenRepository} from '../../../repositories/revoked-token.repository';
import {STATUS_CODE} from '../../../controllers/status-codes.enum';

export class LogoutController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private readonly req: Request,
    @repository(RevokedTokenRepository)
    private readonly revokedTokenRepository: RevokedTokenRepository,
  ) {}

  @secured(SecuredType.IS_AUTHENTICATED)
  @post('/logout', {
    responses: {
      [STATUS_CODE.OK]: {
        description: 'logout success',
      },
    },
    security: [{token: []}],
  })
  async logout(@param.header.string('Authorization') auth: string) {
    try {
      const token = auth && auth.replace(/bearer /i, '');
      if (!token) {
        throw new HttpErrors.Unauthorized('TokenInvalid');
      }
      await this.revokedTokenRepository.set(token, {token});
    } catch (err) {
      throw new HttpErrors.InternalServerError('UnknownError');
    }
    return true;
  }
}
