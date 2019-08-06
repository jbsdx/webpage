import {model, property} from '@loopback/repository';

import {RoleType} from '../modules/roles/role.enum';
import {BaseEntity} from './base-entity.model';

@model({
  name: 'Role',
})
export class Role extends BaseEntity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  permissions: string[];

  @property({
    type: 'number',
    name: 'role_key',
  })
  roleKey: RoleType;

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role;
