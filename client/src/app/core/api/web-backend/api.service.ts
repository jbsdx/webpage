import {Injectable, inject} from '@angular/core';
import {BaseApiService} from '../base-api.service';
import {LoginControllerService, APIS} from 'src/sdk/web-backend';

@Injectable({
  providedIn: 'root',
})
export class WebBackendApiService {
  constructor(private readonly loginController: LoginControllerService) {}

  updateService(c) {
    this.loginController.configuration = c;
  }
}
