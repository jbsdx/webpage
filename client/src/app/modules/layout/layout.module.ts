import {NgModule} from '@angular/core';
import {HeaderComponent, FooterComponent} from './components';
import {IdentityModule} from '../identity/identity.module';
import {ApiModule} from 'src/sdk/web-backend';
import {BrowserModule} from '@angular/platform-browser';

const COMPONENTS = [HeaderComponent, FooterComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [BrowserModule, IdentityModule, ApiModule],
  providers: [],
  exports: [...COMPONENTS],
  bootstrap: [],
})
export class LayoutModule {}
