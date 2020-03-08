import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationModule} from './authentication/authentication.module';
import {environment} from 'src/environments/environment';
import { ApiModule, Configuration } from 'src/sdk/web-backend';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthenticationModule,
    AppRoutingModule,
    ApiModule.forRoot(
      () =>
        new Configuration({
          basePath: environment.backendUrl,
        }),
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
