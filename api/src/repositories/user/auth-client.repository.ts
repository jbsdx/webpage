import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../../datasources';
import {inject} from '@loopback/core';
import {AuthClient} from '../../models';

export class AuthClientRepository extends DefaultCrudRepository<
  AuthClient,
  typeof AuthClient.prototype.id
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(AuthClient, dataSource);
  }
}
