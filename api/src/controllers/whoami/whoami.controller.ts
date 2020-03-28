import {get, put, requestBody, param} from '@loopback/rest';
import {STATUS_CODE} from '../status-codes.enum';
import {CONTENT_TYPE} from '../content-type.constant';
import {repository} from '@loopback/repository';
import {WhoAmI} from '../../models';
import {WhoAmIRepository} from '../../repositories';
import {secured, SecuredType} from '../../modules/authorization';

export const IDENDITY_KEY = 'whoAmI';

export class WhoamiController {
  constructor(
    @repository(WhoAmIRepository) private whoAmIRepository: WhoAmIRepository,
  ) {}

  @get('/whoami', {
    responses: {
      [STATUS_CODE.OK]: {
        description: 'WhoAmI Identity',
        content: {
          [CONTENT_TYPE.JSON]: {
            schema: {'x-ts-type': WhoAmI},
          },
        },
      },
    },
  })
  async whoami(): Promise<WhoAmI> {
    const redisValue = await this.whoAmIRepository.get(IDENDITY_KEY);
    return redisValue;
  }

  @put('/whoami', {
    responses: {
      '204': {
        description: 'WhoAmI PUT success',
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ANY_ROLE, ['admin'])
  async replace(@requestBody() whoAmI: WhoAmI): Promise<void> {
    await this.whoAmIRepository.set(IDENDITY_KEY, whoAmI);
  }
}
