import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthenticationComponent} from './authentication.component';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {AuthenticationService} from './services';
import {LoginComponent} from './components';

const COMPONENTS = [AuthenticationComponent, LoginComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [HttpClientModule, FormsModule, AuthenticationRoutingModule],
  providers: [AuthenticationService],
  bootstrap: [AuthenticationComponent],
})
export class AuthenticationModule {}
