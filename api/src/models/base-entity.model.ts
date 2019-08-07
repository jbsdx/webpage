import {SoftDeleteEntity} from 'loopback4-soft-delete';
import {property} from '@loopback/repository';

export abstract class BaseEntity extends SoftDeleteEntity {
  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdOn?: Date;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  modifiedOn?: Date;
}
