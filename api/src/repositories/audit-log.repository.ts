import {DefaultCrudRepository} from '@loopback/repository';
import {AuditLog} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AuditLogRepository extends DefaultCrudRepository<
  AuditLog,
  typeof AuditLog.prototype.id
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(AuditLog, dataSource);
  }
}
