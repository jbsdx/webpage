import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from './pages';
import {PGPViewComponent} from '../identity/components';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    children: [
      {
        path: 'pgp',
        component: PGPViewComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
