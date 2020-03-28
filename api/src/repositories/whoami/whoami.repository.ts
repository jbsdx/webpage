import {DefaultKeyValueRepository} from '@loopback/repository';
import {WhoAmI} from '../../models';
import {RedisDataSource} from '../../datasources';
import {inject} from '@loopback/core';

export class WhoAmIRepository extends DefaultKeyValueRepository<WhoAmI> {
  constructor(@inject('datasources.redis') dataSource: RedisDataSource) {
    super(WhoAmI, dataSource);
  }
}
