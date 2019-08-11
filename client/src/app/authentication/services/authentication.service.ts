import {Injectable} from '@angular/core';
import {
  LoginControllerService,
  ApiModule,
  Configuration,
  PingControllerService,
} from 'src/sdk';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private readonly loginApi: LoginControllerService,
    private pingApi: PingControllerService,
  ) {}

  /**
   * Login with credentials
   *
   * @param username
   * @param password
   *
   */
  async login(username: string, password: string) {
    console.log('pingodne');
    const loginRes = await this.getAuthCode(username, password);
    if (loginRes.code) {
      const authRes = await this.getAccessToken(username, loginRes.code);
      console.log(authRes);

      const {accessToken, refreshToken} = authRes;
      this.updateAccessToken(accessToken);
    }
  }

  async updateAccessToken(accessToken: string) {
    ApiModule.forRoot(
      () =>
        new Configuration({
          accessToken: accessToken,
          basePath: 'http://localhost:3000',
        }),
    );
  }

  private getAuthCode(username: string, password: string) {
    return this.loginApi
      .loginControllerLogin({
        client_id: 'webapp',
        client_secret: 'd§kd8fh!',
        password: password,
        username: username,
      })
      .toPromise();
  }

  private async getAccessToken(username, authCode: string) {
    return this.loginApi
      .loginControllerToken({
        clientId: 'webapp',
        code: authCode,
        username: username,
      })
      .toPromise();
  }
}
