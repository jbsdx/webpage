import {post, requestBody, HttpErrors} from '@loopback/rest';
import {UserRepository, UserRoleRepository} from '../../../repositories';
import {repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Credentials, JWT_SECRET} from '../auth';
import {promisify} from 'util';
import {UserCredentials, User} from '../../../models';

const {sign} = require('jsonwebtoken');
const signAsync = promisify(sign);

export class LoginController {
  public readonly credentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;

  constructor(
    @repository(UserRepository) private userRepository: UserRepository,
    @repository(UserRoleRepository)
    private userRoleRepository: UserRoleRepository,
  ) {}

  @post('/users/login')
  async login(@requestBody() credentials: Credentials) {
    const user = await this.userRepository.findOne({
      where: {username: credentials.username},
    });
    if (!user) throw new HttpErrors.Unauthorized('Invalid credentials');
    const userCreds = await this.userRepository.credentials(user.id).get();
    console.log('cress', userCreds);
    const isPasswordMatched = userCreds.password === credentials.password;
    if (!isPasswordMatched)
      throw new HttpErrors.Unauthorized('Invalid credentials');

    const tokenObject = {username: credentials.username};
    const token = await signAsync(tokenObject, JWT_SECRET);
    const roles = await this.userRoleRepository.find({
      where: {userId: user.id},
    });
    const {id, email} = user;

    return {
      token,
      id: id as string,
      email,
      roles: roles.map(r => r.roleId),
    };
  }
}
