import {Getter, inject} from '@loopback/core';
import {
  DataObject,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository';
import {Options} from '@loopback/repository/src/common-types';
import {HttpErrors} from '@loopback/rest';
import {AuthenticationBindings, AuthErrorKeys} from 'loopback4-authentication';

import {User, UserRelations, UserCredentials} from '../models';
import {DefaultUserModifyCrudRepository} from './default-user-modify-crud.repository.base';
import {UserCredentialsRepository} from './user-credentials.repository';
import {MongodbDataSource} from '../datasources';
import {hash, compare} from 'bcryptjs';
import {AuthUser, AuthenticateErrorKeys} from '../modules/authentication';

export class UserRepository extends DefaultUserModifyCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly credentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<AuthUser | undefined>,
    @repository.getter('UserCredentialsRepository')
    getUserCredsRepository: Getter<UserCredentialsRepository>,
  ) {
    super(User, dataSource, getCurrentUser);
    this.credentials = this.createHasOneRepositoryFactoryFor(
      'credentials',
      getUserCredsRepository,
    );
  }

  private readonly saltRounds = 10;

  async create(entity: DataObject<User>, options?: Options): Promise<User> {
    const user = await super.create(entity, options);
    try {
      // Add temporary password for first time
      const password = await hash(
        process.env.USER_TEMP_PASSWORD as string,
        this.saltRounds,
      );
      const creds = new UserCredentials({
        authProvider: 'internal',
        password: password,
      });
      await this.credentials(user.id).create(creds);
    } catch (err) {
      throw new HttpErrors.UnprocessableEntity('Error while hashing password');
    }
    return user;
  }

  async verifyPassword(username: string, password: string): Promise<User> {
    /*
    super
      .find()
      .then(err => console.log('verify', username, password, err))
      .catch(err => console.log(err));
      */
    console.log(super.modelClass.toString(), super.entityClass);
    // const us = await super.getCurrentUser();

    const user = await super.findOne({where: {username: username}});
    const creds = user && (await this.credentials(user.id).get());
    console.log(user, creds);
    if (!user || user.deleted || !creds || !creds.password) {
      throw new HttpErrors.Unauthorized(AuthenticateErrorKeys.UserDoesNotExist);
    } else if (!(await compare(password, creds.password))) {
      throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
    } else if (await compare(password, process.env.USER_TEMP_PASSWORD!)) {
      throw new HttpErrors.Forbidden(
        AuthenticateErrorKeys.TempPasswordLoginDisallowed,
      );
    }
    return user;
  }

  async updatePassword(
    username: string,
    password: string,
    newPassword: string,
  ): Promise<User> {
    const user = await super.findOne({where: {username: username}});
    const creds = user && (await this.credentials(user.id).get());
    if (!user || user.deleted || !creds || !creds.password) {
      throw new HttpErrors.Unauthorized(AuthenticateErrorKeys.UserDoesNotExist);
    } else if (!(await compare(password, creds.password))) {
      throw new HttpErrors.Unauthorized(AuthErrorKeys.WrongPassword);
    } else if (await compare(newPassword, creds.password)) {
      throw new HttpErrors.Unauthorized(
        'Password cannot be same as previous password!',
      );
    }
    await this.credentials(user.id).patch({
      password: await hash(newPassword, this.saltRounds),
    });
    return user;
  }
}
