import {model, property} from '@loopback/repository';

import {BaseEntity} from './base-entity.model';

@model()
export class AuthClient extends BaseEntity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  clientId: string;

  @property({
    type: 'string',
    required: true,
  })
  clientSecret: string;

  @property({
    type: 'string',
    required: true,
  })
  secret: string;

  @property({
    type: 'string',
  })
  redirectUrl?: string;

  @property({
    type: 'number',
    required: true,
  })
  accessTokenExpiration: number;

  @property({
    type: 'number',
    required: true,
  })
  refreshTokenExpiration: number;

  @property({
    type: 'number',
    required: true,
  })
  authCodeExpiration: number;

  constructor(data?: Partial<AuthClient>) {
    super(data);
  }
}
