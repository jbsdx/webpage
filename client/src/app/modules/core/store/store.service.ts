import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PGP} from 'src/sdk/web-backend';
import {IdentityService} from '../../identity/services';

@Injectable({
  providedIn: 'root',
})
export class Store {
  pgp: BehaviorSubject<PGP> = new BehaviorSubject(null);

  constructor(private identityService: IdentityService) {}

  async initApp() {
    this.loadPGP();
  }

  async loadPGP() {
    const pgp = await this.identityService.getPGPKeys().toPromise();
    this.pgp.next(pgp);
  }
}
