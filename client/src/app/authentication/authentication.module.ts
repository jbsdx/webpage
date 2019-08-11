import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationComponent} from './authentication.component';
import {LoginComponent} from './components/login.component';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from './services/authentication.service';

@NgModule({
  declarations: [AuthenticationComponent, LoginComponent],
  imports: [HttpClientModule, FormsModule, AuthenticationRoutingModule],
  providers: [AuthenticationService],
  bootstrap: [AuthenticationComponent],
})
export class AuthenticationModule {}
