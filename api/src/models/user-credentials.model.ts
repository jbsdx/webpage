import {model, property, belongsTo} from '@loopback/repository';
import {User, UserWithRelations} from './user.model';
import {BaseEntity} from '.';

@model({
  name: 'UserCredentials',
})
export class UserCredentials extends BaseEntity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @belongsTo(
    () => User,
    {keyFrom: 'userId', name: 'userId'},
    {
      name: 'userId',
      required: true,
    },
  )
  userId: string;

  @property({
    type: 'string',
    required: true,
    name: 'authProvider',
  })
  authProvider: string;

  @property({
    type: 'string',
    name: 'authId',
  })
  authId?: string;

  @property({
    type: 'string',
    name: 'authToken',
  })
  authToken?: string;

  @property({
    type: 'string',
  })
  password?: string;

  constructor(data?: Partial<UserCredentials>) {
    super(data);
  }
}

export interface UserCredentialsRelations {
  user: UserWithRelations;
}

export type UserCredentialsWithRelations = UserCredentials &
  UserCredentialsRelations;
