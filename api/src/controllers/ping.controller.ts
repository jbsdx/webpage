import {Request, RestBindings, get, ResponseObject} from '@loopback/rest';
import {inject} from '@loopback/context';
import {secured, SecuredType} from '../modules/authorization';
import {AuthenticationBindings, UserProfile} from '@loopback/authentication';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get('/ping', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }

  @get('/ping/is-authenticated', {
    responses: {
      '200': {
        description: 'ping success',
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.IS_AUTHENTICATED)
  testIsAuthenticated(
    @inject(AuthenticationBindings.CURRENT_USER, {optional: true})
    userProfile: UserProfile,
  ) {
    return {message: 'isAuthenticated: OK', profile: userProfile};
  }

  @get('/ping/permit-all', {
    responses: {
      '200': {
        description: 'ping success',
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.PERMIT_ALL)
  testPermitAll() {
    return {message: 'permitAll: OK'};
  }

  @get('/ping/deny-all', {
    responses: {
      '200': {
        description: 'ping success',
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.DENY_ALL)
  testDenyAll() {
    return {message: 'denyAll: OK'};
  }

  @get('/ping/has-any-role', {
    responses: {
      '200': {
        description: 'ping success',
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ANY_ROLE, ['admin', 'ADMIN2'])
  testHasAnyRole() {
    return {message: 'hasAnyRole: OK'};
  }

  @get('/ping/has-roles', {
    responses: {
      '200': {
        description: 'ping success',
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ROLES, ['admin'])
  testHasRoles() {
    return {message: 'hasRoles: OK'};
  }
}
