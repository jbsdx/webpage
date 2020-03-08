import {
  lifeCycleObserver, // The decorator
  LifeCycleObserver, // The interface
} from '@loopback/core';
import {repository, Persistable} from '@loopback/repository';
import {
  RoleRepository,
  UserRepository,
  UserRoleRepository,
  UserCredentialsRepository,
  AuthClientRepository,
} from '../repositories';
import {Role, User, AuthClient, UserRole} from '../models';
import {seedRoles, seedUsers, seedAuthClients} from '../migrations';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('boot-script')
export class SeedObserver implements LifeCycleObserver {
  private seedBasePromises: Persistable[] = [];
  private seedRelationsPromises: Persistable[] = [];

  constructor(
    // @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
    @repository(RoleRepository)
    public roleRepository: RoleRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(UserRoleRepository)
    public userRoleRepository: UserRoleRepository,
    @repository(UserCredentialsRepository)
    public userCredentialsRepository: UserCredentialsRepository,
    @repository(AuthClientRepository)
    public authClientRepository: AuthClientRepository,
  ) {}

  /**
   * This method will be invoked when the application starts
   */
  async start(): Promise<void> {
    const seedDb = process.env['SEED_DATABASE'];

    if (seedDb) {
      console.log('SEEDING DATABASE');
      // load initial database setup
      await this.seedDatabase();
    }
  }

  /**
   * This method will be invoked when the application stops
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }

  private async seedDatabase() {
    await this.createBaseEntities();

    const baseState = await Promise.all(this.seedBasePromises);

    console.log('added base entities: ', baseState.length);

    await this.createRelations();

    const relationsState = await Promise.all(this.seedRelationsPromises);

    console.log('added relations: ', relationsState.length);
  }

  private async createRole(role: Role) {
    const hasEntity = await this.roleRepository.count({
      name: role.name,
    });
    if (!hasEntity.count) {
      const promise = this.roleRepository.create(role);
      this.seedBasePromises.push(promise);
      console.log('created role', role.name);
    }
  }

  private async createUser(user: User) {
    const hasEntity = await this.userRepository.count({
      username: user.username,
    });
    if (!hasEntity.count) {
      const promise = this.userRepository.create(user);
      this.seedBasePromises.push(promise);
      console.log('created user', user.username);
    }
  }

  private async createAuthClient(authClient: AuthClient) {
    const hasEntity = await this.authClientRepository.count({
      clientId: authClient.clientId,
    });
    if (!hasEntity.count) {
      const promise = this.authClientRepository.create(authClient);
      this.seedBasePromises.push(promise);
      console.log('created auth-client', authClient.clientId);
    }
  }

  private async createUserRole(userRole: UserRole) {
    const hasEntity = await this.userRoleRepository.count({
      roleId: userRole.roleId,
      userId: userRole.userId,
    });
    if (!hasEntity.count) {
      const promise = this.userRoleRepository.create(userRole);
      this.seedRelationsPromises.push(promise);
      console.log('created user-role', userRole.id, userRole.roleId);
    }
  }

  private async createBaseEntities() {
    // add roles
    for (const i in seedRoles) {
      await this.createRole(new Role(seedRoles[i]));
    }

    // add users
    for (const i in seedUsers) {
      await this.createUser(new User(seedUsers[i]));
    }

    // add auth-clients
    for (const i in seedAuthClients) {
      await this.createAuthClient(new AuthClient(seedAuthClients[i]));
    }
    return true;
  }

  private async createRelations() {
    const adminRole = await this.roleRepository.findOne({
      where: {
        name: 'admin',
      },
    });
    if (adminRole) {
      const users = await this.userRepository.find({});
      for (const i in users) {
        await this.createUserRole(
          new UserRole({
            userId: users[i].id,
            roleId: adminRole.id,
          }),
        );
      }
    }
  }
}
