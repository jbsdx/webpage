import {model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {BaseEntity} from './base-entity.model';

@model({settings: {strict: false}})
export class UserCredentials extends BaseEntity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @belongsTo(() => User)
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  constructor(data?: Partial<UserCredentials>) {
    super(data);
  }
}

export interface UserCredentialsRelations {
  // describe navigational properties here
}

export type UserCredentialsWithRelations = UserCredentials &
  UserCredentialsRelations;
