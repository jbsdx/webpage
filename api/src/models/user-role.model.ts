import {model, property, belongsTo} from '@loopback/repository';
import {BaseEntity} from './base-entity.model';
import {User} from './user.model';
import {Role} from './role.model';

@model({settings: {strict: false}})
export class UserRole extends BaseEntity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Role)
  roleId: string;

  constructor(data?: Partial<UserRole>) {
    super(data);
  }
}

export interface UserRoleRelations {
  // describe navigational properties here
}

export type UserRoleWithRelations = UserRole & UserRoleRelations;
