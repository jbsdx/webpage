/* eslint-disable @typescript-eslint/no-explicit-any */
import {operation, OpenApiBuilder} from '@loopback/rest';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by HelloController
 *
 */
export class HelloController {
  constructor(private spec: OpenApiBuilder) {
    const json = this.spec.getSpecAsYaml();
    console.log(json);
  }

  /**
   *
   *

   */
  @operation('get', '/hello')
  async hello(): Promise<any> {
    throw new Error('Not implemented');
  }
}
