import {Component, OnInit} from '@angular/core';
import {User, PingControllerService} from 'src/sdk/web-backend';
import {AuthenticationService} from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = {
    username: '',
    email: '',
    password: '',
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
