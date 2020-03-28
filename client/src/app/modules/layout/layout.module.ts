import {NgModule} from '@angular/core';
import {HeaderComponent, FooterComponent} from './base';
import {IdentityModule} from '../identity/identity.module';
import {ApiModule} from 'src/sdk/web-backend';
import {BrowserModule} from '@angular/platform-browser';
import {AboutComponent} from './pages';
import {LayoutRoutingModule} from './layout-routing.module';

const COMPONENTS = [HeaderComponent, FooterComponent, AboutComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [BrowserModule, LayoutRoutingModule, IdentityModule, ApiModule],
  providers: [],
  exports: [...COMPONENTS],
  bootstrap: [],
})
export class LayoutModule {}
