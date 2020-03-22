import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from 'src/app/modules/core/store/store.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {PGP} from 'src/sdk/web-backend';

@Component({
  selector: 'app-pgp-view',
  templateUrl: './pgp-view.component.html',
  styleUrls: ['./pgp-view.component.scss'],
})
export class PGPViewComponent implements OnInit, OnDestroy {
  pgp: PGP;
  pgpSubscription: Subscription;

  constructor(private store: Store) {}

  ngOnInit() {
    this.pgpSubscription = this.store.pgp.subscribe(pgp => {
      this.pgp = pgp;
    });
  }

  ngOnDestroy() {
    this.pgpSubscription.unsubscribe();
  }
}
