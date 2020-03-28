import {Injectable} from '@angular/core';
import {LoginControllerService} from 'src/sdk/web-backend';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly loginApi: LoginControllerService) {}

  /**
   * Login with credentials
   *
   * @param username Username
   * @param password Password
   *
   */
  async login(username: string, password: string) {
    // get auth code
    const loginRes = await this.getAuthCode(username, password);
    if (loginRes.code) {
      // trade code with acces-token
      const authRes = await this.getAccessToken(username, loginRes.code);
    }
  }

  private getAuthCode(username: string, password: string) {
    return this.loginApi
      .loginControllerLogin({
        client_id: 'webapp',
        client_secret: '123456',
        password,
        username,
      } as any)
      .toPromise();
  }

  private async getAccessToken(username, authCode: string) {
    return this.loginApi
      .loginControllerToken({
        clientId: 'webapp',
        code: authCode,
        username,
      })
      .toPromise();
  }
}
