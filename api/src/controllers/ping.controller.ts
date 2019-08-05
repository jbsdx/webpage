/* eslint-disable @typescript-eslint/no-explicit-any */
import {operation} from '@loopback/rest';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by PingController
 *
 */
export class PingController {
  constructor() {}

  /**
   *
   *

   * @returns Ping Response
   */
  @operation('get', '/ping')
  async ping(): Promise<{
    greeting?: string;
    date?: string;
    url?: string;
    headers?: {
      'Content-Type'?: string;
      [additionalProperty: string]: any;
    };
  }> {
    throw new Error('Not implemented');
  }
}
