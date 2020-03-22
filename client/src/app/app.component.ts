import {Component, OnInit} from '@angular/core';
import {Store} from './modules/core/store/store.service';
import {BehaviorSubject} from 'rxjs';
import {PGP} from 'src/sdk/web-backend';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  pgp: BehaviorSubject<PGP>;

  constructor(private storeService: Store) {}

  async ngOnInit() {
    // init app data
    this.storeService.initApp();
    this.pgp = this.storeService.pgp;
  }
}
