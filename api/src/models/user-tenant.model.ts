import {model, property, belongsTo} from '@loopback/repository';
import {BaseEntity} from './base-entity.model';
import {Tenant, TenantWithRelations} from './tenant.model';
import {User, UserWithRelations} from './user.model';
import {Role, RoleWithRelations} from './role.model';

@model({
  name: 'UserTenant',
})
export class UserTenant extends BaseEntity {
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

  @belongsTo(
    () => Tenant,
    {keyFrom: 'tenantId', name: 'tenantId'},
    {
      name: 'tenantId',
      required: true,
    },
  )
  tenantId: string;

  @belongsTo(
    () => Role,
    {keyFrom: 'roleId', name: 'roleId'},
    {
      name: 'roleId',
      required: true,
    },
  )
  roleId: string;

  @property({
    type: 'string',
    required: true,
    default: 'active',
  })
  status: string;

  constructor(data?: Partial<UserTenant>) {
    super(data);
  }
}

export interface UserTenantRelations {
  user: UserWithRelations;
  tenant: TenantWithRelations;
  role: RoleWithRelations;
}

export type UserTenantWithRelations = UserTenant & UserTenantRelations;
