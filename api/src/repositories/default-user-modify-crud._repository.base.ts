import {SoftCrudRepository} from 'loopback4-soft-delete';

import {UserModifiableEntity} from '../models';
import {DataObject, Where, Count} from '@loopback/repository';
import {Options} from 'loopback-datasource-juggler';
import {HttpErrors} from '@loopback/rest';
import {MongodbDataSource} from '../datasources';
import {UserProfile, AuthenticationBindings} from '@loopback/authentication';
import {inject, Getter} from '@loopback/core';

export abstract class DefaultUserModifyCrudRepository<
  T extends UserModifiableEntity,
  ID,
  Relations extends object = {}
> extends SoftCrudRepository<T, ID, Relations> {
  constructor(
    entityClass: typeof UserModifiableEntity & {
      prototype: T;
    },
    dataSource: MongodbDataSource,
    protected readonly getCurrentUser: Getter<UserProfile | undefined>,
  ) {
    super(entityClass, dataSource);
  }

  async create(entity: DataObject<T>, options?: Options): Promise<T> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new HttpErrors.Forbidden('InvalidCredentials');
    }
    entity.createdBy = currentUser.id;
    entity.modifiedBy = currentUser.id;
    return super.create(entity, options);
  }

  async createAll(entities: DataObject<T>[], options?: Options): Promise<T[]> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new HttpErrors.Forbidden('InvalidCredentials');
    }
    entities.forEach(entity => {
      entity.createdBy = currentUser ? currentUser.id : '';
      entity.modifiedBy = currentUser ? currentUser.id : '';
    });
    return super.createAll(entities, options);
  }

  async save(entity: T, options?: Options): Promise<T> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new HttpErrors.Forbidden('InvalidCredentials');
    }
    entity.modifiedBy = currentUser.id;
    return super.save(entity, options);
  }

  async update(entity: T, options?: Options): Promise<void> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new HttpErrors.Forbidden('InvalidCredentials');
    }
    entity.modifiedBy = currentUser.id;
    return super.update(entity, options);
  }

  async updateAll(
    data: DataObject<T>,
    where?: Where<T>,
    options?: Options,
  ): Promise<Count> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new HttpErrors.Forbidden('InvalidCredentials');
    }
    data.modifiedBy = currentUser.id;
    return super.updateAll(data, where, options);
  }

  async updateById(
    id: ID,
    data: DataObject<T>,
    options?: Options,
  ): Promise<void> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new HttpErrors.Forbidden('InvalidCredentials');
    }
    data.modifiedBy = currentUser.id;
    return super.updateById(id, data, options);
  }
  async replaceById(
    id: ID,
    data: DataObject<T>,
    options?: Options,
  ): Promise<void> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new HttpErrors.Forbidden('InvalidCredentials');
    }
    data.modifiedBy = currentUser.id;
    return super.replaceById(id, data, options);
  }
}
