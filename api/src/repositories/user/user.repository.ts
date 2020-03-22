import {
  repository,
  HasOneRepositoryFactory,
  DefaultCrudRepository,
  DataObject,
  Options,
} from '@loopback/repository';
import {User, UserRelations, UserCredentials} from '../../models';
import {MongodbDataSource} from '../../datasources';
import {inject, Getter} from '@loopback/core';
import {UserCredentialsRepository} from './user-credentials.repository';
import {hash, compare} from 'bcryptjs';
import {HttpErrors} from '@loopback/rest';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly credentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;

  private saltRounds = 10;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    // @inject.getter(AuthenticationBindings.CURRENT_USER)
    // public getCurrentUser: Getter<UserProfile>,
    @repository.getter('UserCredentialsRepository')
    getUserCredsRepository: Getter<UserCredentialsRepository>,
  ) {
    //super(User, dataSource, getCurrentUser);
    super(User, dataSource);
    this.credentials = this.createHasOneRepositoryFactoryFor(
      'credentials',
      getUserCredsRepository,
    );
  }

  async create(entity: DataObject<User>, options?: Options): Promise<User> {
    // Add temporary password, if not set
    const password =
      entity.password || (process.env.USER_TEMP_PASSWORD as string);
    delete entity.password;
    const user = await super.create(entity, options);
    try {
      const passwordHash = await hash(password, this.saltRounds);
      const creds = new UserCredentials({
        password: passwordHash,
      });
      await this.credentials(user.id).create(creds);
    } catch (err) {
      throw new HttpErrors.UnprocessableEntity('Error while hashing password');
    }
    return user;
  }

  async verifyPassword(username: string, password: string): Promise<User> {
    const user = await super.findOne({where: {username: username}});
    const creds = user && (await this.credentials(user.id).get());
    if (!user || user.deleted || !creds || !creds.password) {
      throw new HttpErrors.Unauthorized('UserDoesNotExist');
    } else if (!(await compare(password, creds.password))) {
      throw new HttpErrors.Unauthorized('InvalidCredentials');
    }
    return user;
  }
}
