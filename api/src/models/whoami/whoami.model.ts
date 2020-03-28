import {model, property, Entity} from '@loopback/repository';

@model({settings: {strict: true}})
export class WhoAmI extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  btc: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  imageUrl: string;

  @property({
    type: 'string',
    required: true,
  })
  githubUrl: string;

  @property({
    type: 'string',
    required: true,
  })
  keybaseUrl: string;

  constructor(data?: Partial<WhoAmI>) {
    super(data);
  }
}
