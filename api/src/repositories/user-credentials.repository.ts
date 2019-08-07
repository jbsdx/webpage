import {UserCredentials, UserCredentialsRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserProfile, AuthenticationBindings} from '@loopback/authentication';
import {repository, DefaultCrudRepository} from '@loopback/repository';

export class UserCredentialsRepository extends DefaultCrudRepository<
  UserCredentials,
  typeof UserCredentials.prototype.id,
  UserCredentialsRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('UserCredentialsRepository')
    getUserCredsRepository: Getter<UserCredentialsRepository>,
  ) {
    super(UserCredentials, dataSource);
  }
}
