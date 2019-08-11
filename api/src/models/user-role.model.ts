import {model, property, belongsTo} from '@loopback/repository';
import {BaseEntity} from './base-entity.model';
import {User, UserWithRelations} from './user.model';
import {Role, RoleWithRelations} from './role.model';

@model({
  settings: {
    strict: false,
  },
})
export class UserRole extends BaseEntity {
  @property({
    type: String,
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
  role: RoleWithRelations;
  user: UserWithRelations;
}

export type UserRoleWithRelations = UserRole & UserRoleRelations;
