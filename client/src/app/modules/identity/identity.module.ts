import {NgModule} from '@angular/core';
import {PGPViewComponent, IdentityLabelComponent} from './components';
import {ApiModule} from 'src/sdk/web-backend';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {IdentityRoutingModule} from './identity-routing.module';

const COMPONENTS = [IdentityLabelComponent, PGPViewComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [ApiModule, IdentityRoutingModule, FontAwesomeModule],
  exports: [...COMPONENTS],
  providers: [],
  bootstrap: [],
})
export class IdentityModule {}
