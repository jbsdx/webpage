import {
  DefaultCrudRepository,
  BelongsToAccessor,
  repository,
} from '@loopback/repository';
import {UserRole, UserRoleRelations, Role, User} from '../../models';
import {MongodbDataSource} from '../../datasources';
import {inject, Getter} from '@loopback/core';
import {RoleRepository} from './role.repository';
import {UserRepository} from './user.repository';

export class UserRoleRepository extends DefaultCrudRepository<
  UserRole,
  typeof UserRole.prototype.id,
  UserRoleRelations
> {
  public readonly role: BelongsToAccessor<Role, typeof Role.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('RoleRepository')
    roleRepositoryGetter: Getter<RoleRepository>,
    @repository.getter('UserRepository')
    userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(UserRole, dataSource);

    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
  }
}
