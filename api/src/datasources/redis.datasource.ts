import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './redis.datasource.json';

export class RedisDataSource extends juggler.DataSource {
  static dataSourceName = 'redis';

  constructor(
    @inject('datasources.config.redis', {optional: true})
    dsConfig: object = config,
  ) {
    Object.assign(dsConfig, {
      url: process.env.REDIS_URL,
    });
    console.log('redis', dsConfig);
    super(dsConfig);
  }
}
