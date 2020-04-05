import {Component, OnInit} from '@angular/core';
import {Store} from './modules/core/store/store.service';
import {BehaviorSubject} from 'rxjs';
import {WhoAmI} from 'src/sdk/web-backend';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayOptInDialog = true;

  whoAmI: BehaviorSubject<WhoAmI> = this.storeService.whoAmI;
  faWindowClose = faWindowClose;

  constructor(private storeService: Store) {}

  async ngOnInit() {
    // init app data
    this.storeService.initApp();
  }

  toggleOptInDialog() {
    this.displayOptInDialog = !this.displayOptInDialog;
  }
}
