import {get} from '@loopback/rest';
import {XPUB} from '../pgp_keys';
import {STATUS_CODE} from './status-codes.enum';
import {PGP} from '../models';
import {CONTENT_TYPE} from './content-type.constant';

export class WhoamiController {
  constructor() {}

  @get('/whoami', {
    responses: {
      [STATUS_CODE.OK]: {
        description: 'PGP keys',
        content: {
          [CONTENT_TYPE.JSON]: {
            schema: {'x-ts-type': PGP},
          },
        },
      },
    },
  })
  whoami(): PGP {
    return new PGP({
      fingerprint: process.env['PGP_FINGERPRINT'] as string,
      xpub: XPUB,
    });
  }
}
