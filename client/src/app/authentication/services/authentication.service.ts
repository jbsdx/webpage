import { Injectable } from '@angular/core';
import {
  LoginControllerService,
  ApiModule,
  Configuration,
  PingControllerService,
} from 'src/sdk/web-backend';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private readonly loginApi: LoginControllerService,
    private pingApi: PingControllerService,
    private apiConfigurationService: ApiConfigurationService,
  ) {
    this.loginApi.configuration = this.apiConfigurationService.configuration;
  }

  /**
   * Login with credentials
   *
   * @param username
   * @param password
   *
   */
  async login(username: string, password: string) {
    // get auth code
    const loginRes = await this.getAuthCode(username, password);
    if (loginRes.code) {
      // trade code with acces-token
      const authRes = await this.getAccessToken(username, loginRes.code);
      const { accessToken, refreshToken } = authRes;
      this.apiConfigurationService.updateAccessToken(accessToken);
    }
  }

  private getAuthCode(username: string, password: string) {
    return this.loginApi
      .loginControllerLogin({
        clientId: 'webapp',
        clientSecret: 'd§kd8fh!',
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
