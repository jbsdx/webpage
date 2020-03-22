import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {UserRole} from '../../models';
import {UserRoleRepository} from '../../repositories';
import {secured, SecuredType} from '../../modules/authorization';

export class UserRoleController {
  constructor(
    @repository(UserRoleRepository)
    public userRoleRepository: UserRoleRepository,
  ) {}

  @post('/user-roles', {
    responses: {
      '200': {
        description: 'UserRole model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserRole)}},
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ANY_ROLE, ['admin'])
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserRole, {exclude: ['id']}),
        },
      },
    })
    userRole: Omit<UserRole, 'id'>,
  ): Promise<UserRole> {
    return this.userRoleRepository.create(userRole);
  }

  @get('/user-roles/count', {
    responses: {
      '200': {
        description: 'UserRole model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ANY_ROLE, ['admin'])
  async count(
    @param.query.object('where', getWhereSchemaFor(UserRole))
    where?: Where<UserRole>,
  ): Promise<Count> {
    return this.userRoleRepository.count(where);
  }

  @get('/user-roles', {
    responses: {
      '200': {
        description: 'Array of UserRole model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserRole)},
          },
        },
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ANY_ROLE, ['admin'])
  async find(
    @param.query.object('filter', getFilterSchemaFor(UserRole))
    filter?: Filter<UserRole>,
  ): Promise<UserRole[]> {
    return this.userRoleRepository.find(filter);
  }

  @patch('/user-roles', {
    responses: {
      '200': {
        description: 'UserRole PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ANY_ROLE, ['admin'])
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserRole, {partial: true}),
        },
      },
    })
    userRole: UserRole,
    @param.query.object('where', getWhereSchemaFor(UserRole))
    where?: Where<UserRole>,
  ): Promise<Count> {
    return this.userRoleRepository.updateAll(userRole, where);
  }

  @get('/user-roles/{id}', {
    responses: {
      '200': {
        description: 'UserRole model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserRole)}},
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ANY_ROLE, ['admin'])
  async findById(@param.path.string('id') id: string): Promise<UserRole> {
    return this.userRoleRepository.findById(id);
  }

  @patch('/user-roles/{id}', {
    responses: {
      '204': {
        description: 'UserRole PATCH success',
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ANY_ROLE, ['admin'])
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserRole, {partial: true}),
        },
      },
    })
    userRole: UserRole,
  ): Promise<void> {
    await this.userRoleRepository.updateById(id, userRole);
  }

  @put('/user-roles/{id}', {
    responses: {
      '204': {
        description: 'UserRole PUT success',
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ANY_ROLE, ['admin'])
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userRole: UserRole,
  ): Promise<void> {
    await this.userRoleRepository.replaceById(id, userRole);
  }

  @del('/user-roles/{id}', {
    responses: {
      '204': {
        description: 'UserRole DELETE success',
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ANY_ROLE, ['admin'])
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRoleRepository.deleteById(id);
  }
}
