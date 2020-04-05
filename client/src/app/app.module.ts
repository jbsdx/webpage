import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {ApiModule, Configuration} from 'src/sdk/web-backend';
import {IdentityModule} from './modules/identity/identity.module';
import {LayoutModule} from './modules/layout/layout.module';
import {AuthenticationModule} from './modules/authentication/authentication.module';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

const APP_MODULES = [IdentityModule, LayoutModule];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthenticationModule,
    AppRoutingModule,
    FontAwesomeModule,
    ApiModule.forRoot(
      () =>
        new Configuration({
          basePath: environment.backendUrl,
        }),
    ),
    ...APP_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
