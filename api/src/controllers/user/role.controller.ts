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
import {Role} from '../../models';
import {RoleRepository} from '../../repositories';
import {CONTENT_TYPE} from '../content-type.constant';
import {secured, SecuredType} from '../../modules/authorization';

export class RoleController {
  constructor(
    @repository(RoleRepository)
    public roleRepository: RoleRepository,
  ) {}

  @post('/roles', {
    responses: {
      '200': {
        description: 'Role model instance',
        content: {[CONTENT_TYPE.JSON]: {schema: getModelSchemaRef(Role)}},
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ANY_ROLE, ['admin'])
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Role, {exclude: ['id']}),
        },
      },
    })
    role: Omit<Role, 'id'>,
  ): Promise<Role> {
    return this.roleRepository.create(role);
  }

  @get('/roles/count', {
    responses: {
      '200': {
        description: 'Role model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ANY_ROLE, ['admin'])
  async count(
    @param.query.object('where', getWhereSchemaFor(Role)) where?: Where<Role>,
  ): Promise<Count> {
    return this.roleRepository.count(where);
  }

  @get('/roles', {
    responses: {
      '200': {
        description: 'Array of Role model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Role)},
          },
        },
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ANY_ROLE, ['admin'])
  async find(
    @param.query.object('filter', getFilterSchemaFor(Role))
    filter?: Filter<Role>,
  ): Promise<Role[]> {
    return this.roleRepository.find(filter);
  }

  @patch('/roles', {
    responses: {
      '200': {
        description: 'Role PATCH success count',
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
          schema: getModelSchemaRef(Role, {partial: true}),
        },
      },
    })
    role: Role,
    @param.query.object('where', getWhereSchemaFor(Role)) where?: Where<Role>,
  ): Promise<Count> {
    return this.roleRepository.updateAll(role, where);
  }

  @get('/roles/{id}', {
    responses: {
      '200': {
        description: 'Role model instance',
        content: {'application/json': {schema: getModelSchemaRef(Role)}},
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ANY_ROLE, ['admin'])
  async findById(@param.path.string('id') id: string): Promise<Role> {
    return this.roleRepository.findById(id);
  }

  @patch('/roles/{id}', {
    responses: {
      '204': {
        description: 'Role PATCH success',
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
          schema: getModelSchemaRef(Role, {partial: true}),
        },
      },
    })
    role: Role,
  ): Promise<void> {
    await this.roleRepository.updateById(id, role);
  }

  @put('/roles/{id}', {
    responses: {
      '204': {
        description: 'Role PUT success',
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ANY_ROLE, ['admin'])
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() role: Role,
  ): Promise<void> {
    await this.roleRepository.replaceById(id, role);
  }

  @del('/roles/{id}', {
    responses: {
      '204': {
        description: 'Role DELETE success',
      },
    },
    security: [{token: []}],
  })
  @secured(SecuredType.HAS_ANY_ROLE, ['admin'])
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.roleRepository.deleteById(id);
  }
}
