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
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    super(dsConfig);
  }
}
