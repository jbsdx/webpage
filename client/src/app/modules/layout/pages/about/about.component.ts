import {Component, OnInit, OnDestroy} from '@angular/core';
import {WhoAmI} from 'src/sdk/web-backend';
import {Subscription} from 'rxjs';
import {Store} from 'src/app/modules/core/store/store.service';
import {faKey, faAt} from '@fortawesome/free-solid-svg-icons';
import {faBtc, faGithub, faKeybase} from '@fortawesome/free-brands-svg-icons';
import {IdentityLabel} from 'src/app/modules/identity/models';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {
  whoAmI: WhoAmI;
  whoAmISubscription: Subscription;

  identityLabels: IdentityLabel[];

  constructor(private store: Store) {}

  ngOnInit() {
    this.whoAmISubscription = this.store.whoAmI.subscribe(whoAmI => {
      if (whoAmI) {
        this.whoAmI = whoAmI;
        this.generateIdentityLabels(whoAmI);
      }
    });
  }

  ngOnDestroy() {
    this.whoAmISubscription.unsubscribe();
  }

  private generateIdentityLabels(whoAmI: WhoAmI) {
    this.identityLabels = [
      {
        key: 'keybase',
        link: whoAmI.keybaseUrl,
        value: whoAmI.keybaseUrl,
        icon: faKeybase,
        tooltip: 'Keybase',
        linkExternal: true,
      },
      {
        key: 'github',
        link: whoAmI.githubUrl,
        value: whoAmI.githubUrl,
        icon: faGithub,
        tooltip: 'Github',
        linkExternal: true,
      },
      {
        key: 'email',
        value: whoAmI.email.replace('@', '[at]'),
        icon: faAt,
        tooltip: 'E-Mail',
      },
      {
        key: 'btc',
        value: whoAmI.btc,
        icon: faBtc,
        tooltip: 'BTC Address',
      },
      {
        key: 'pgp',
        value:
          whoAmI.fingerprint.substr(0, 24) +
          '<br>' +
          whoAmI.fingerprint.substr(25),
        icon: faKey,
        tooltip: 'PGP Fingerprint',
        link: '/about/pgp',
      },
    ].filter(label => label.value);
  }
}
