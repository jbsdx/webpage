import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './mongodb.datasource.json';

export class MongodbDataSource extends juggler.DataSource {
  static dataSourceName = 'mongodb';

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = config,
  ) {
    Object.assign(dsConfig, {
      url: process.env.DB_URL,
      db: process.env.DB_DATABASE,
    });
    console.log('mongo', dsConfig);
    super(dsConfig);
  }
}
