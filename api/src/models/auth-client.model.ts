import {model, property} from '@loopback/repository';
import {IAuthClient} from 'loopback4-authentication';

import {BaseEntity} from './base-entity.model';

@model({
  name: 'AuthClient',
})
export class AuthClient extends BaseEntity implements IAuthClient {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    name: 'clientId',
  })
  clientId: string;

  @property({
    type: 'string',
    required: true,
    name: 'clientSecret',
  })
  clientSecret: string;

  @property({
    type: 'string',
    required: true,
  })
  secret: string;

  @property({
    type: 'string',
    name: 'redirectUrl',
  })
  redirectUrl?: string;

  @property({
    type: 'array',
    itemType: 'number',
    name: 'userIds',
  })
  userIds: string[];

  @property({
    type: 'number',
    required: true,
    name: 'accessTokenExpiration',
  })
  accessTokenExpiration: number;

  @property({
    type: 'number',
    required: true,
    name: 'refreshTokenExpiration',
  })
  refreshTokenExpiration: number;

  @property({
    type: 'number',
    required: true,
    name: 'authCodeExpiration',
  })
  authCodeExpiration: number;

  constructor(data?: Partial<AuthClient>) {
    super(data);
  }
}
