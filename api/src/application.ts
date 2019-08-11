import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence} from './sequence';
import {AuthenticationBindings} from '@loopback/authentication';
import {
  MyAuthMetadataProvider,
  MyAuthBindings,
  MyAuthAuthenticationStrategyProvider,
  MyAuthActionProvider,
} from './modules/authorization';

import * as dotenv from 'dotenv';
import * as dotenvExt from 'dotenv-extended';

export class WebApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.api({
      openapi: '3.0.0',
      info: {
        title: process.env['TITLE'] as string,
        version: process.env['VERSION'] as string,
      },
      paths: {},
      components: {
        securitySchemes: {
          token: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            in: 'header',
          },
        },
      },
    });

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.bind(AuthenticationBindings.METADATA).toProvider(
      MyAuthMetadataProvider,
    );
    this.bind(MyAuthBindings.STRATEGY).toProvider(
      MyAuthAuthenticationStrategyProvider,
    );
    this.bind(AuthenticationBindings.AUTH_ACTION).toProvider(
      MyAuthActionProvider,
    );

    this.projectRoot = __dirname;

    this.bootOptions = {
      controllers: {
        dirs: ['controllers', 'modules'],
        extensions: ['.controller.js'],
        nested: true,
      },
      repositories: {
        dirs: ['repositories'],
      },
    };

    dotenv.config();
    dotenvExt.load({
      schema: '.env.stage',
      errorOnMissing: false,
    });
  }
}
