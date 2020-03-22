import {Entity, model, property} from '@loopback/repository';

@model()
export class RefreshToken extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  clientId: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  constructor(data?: Partial<RefreshToken>) {
    super(data);
  }
}
