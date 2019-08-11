import {model, property} from '@loopback/repository';

import {User} from '../../../models';

@model()
export class AuthUser extends User {
  @property({
    type: 'array',
    required: true,
  })
  roles: string[];

  @property({
    type: 'string',
  })
  externalAuthToken?: string;

  @property({
    type: 'string',
  })
  externalRefreshToken?: string;

  constructor(data?: Partial<AuthUser>) {
    super(data);
  }
}
