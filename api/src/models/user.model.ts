import {model, property, hasOne} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';
import {UserModifiableEntity} from './user-modifiable-entity.model';

@model({settings: {strict: false}})
export class User extends UserModifiableEntity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'date',
  })
  lastLogin?: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password?: string;

  @hasOne(() => UserCredentials, {
    keyTo: 'userId',
  })
  credentials: UserCredentials;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  credentials: UserWithRelations;
}

export type UserWithRelations = User & UserRelations;
