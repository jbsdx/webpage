import {model, property, Model} from '@loopback/repository';

@model({settings: {strict: true}})
export class PGP extends Model {
  @property({
    type: 'string',
    required: true,
  })
  fingerprint: string;

  @property({
    type: 'string',
    required: true,
  })
  xpub: string;

  constructor(data?: Partial<PGP>) {
    super(data);
  }
}
