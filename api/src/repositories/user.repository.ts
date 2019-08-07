import {
  repository,
  HasOneRepositoryFactory,
  DefaultCrudRepository,
} from '@loopback/repository';
import {User, UserRelations, UserCredentials} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserCredentialsRepository} from './user-credentials.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly credentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('UserCredentialsRepository')
    getUserCredsRepository: Getter<UserCredentialsRepository>,
  ) {
    super(User, dataSource);
    this.credentials = this.createHasOneRepositoryFactoryFor(
      'credentials',
      getUserCredsRepository,
    );
  }
}
