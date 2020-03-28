import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from 'src/app/modules/core/store/store.service';
import {Subscription} from 'rxjs';
import {WhoAmI} from 'src/sdk/web-backend';

@Component({
  selector: 'app-pgp-view',
  templateUrl: './pgp-view.component.html',
  styleUrls: ['./pgp-view.component.scss'],
})
export class PGPViewComponent implements OnInit, OnDestroy {
  whoAmI: WhoAmI;
  whoAmISubscription: Subscription;

  constructor(private store: Store) {}

  ngOnInit() {
    this.whoAmISubscription = this.store.whoAmI.subscribe(whoAmI => {
      this.whoAmI = whoAmI;
    });
  }

  ngOnDestroy() {
    this.whoAmISubscription.unsubscribe();
  }
}
