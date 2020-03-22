import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PGPViewComponent} from './components';

const routes: Routes = [
  {
    path: 'ident',
    component: PGPViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class IdentityRoutingModule {}
