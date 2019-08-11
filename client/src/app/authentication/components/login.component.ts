import {Component, OnInit} from '@angular/core';
import {User, UserControllerService, PingControllerService} from 'src/sdk';
import {AuthenticationService} from '../services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
  };

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly pingApi: PingControllerService,
  ) {}

  async ngOnInit() {}

  login() {
    this.authenticationService.login(this.user.username, this.user.password);
  }

  async pingtest() {
    await this.pingApi.pingControllerTestHasRoles().toPromise();
  }
}
