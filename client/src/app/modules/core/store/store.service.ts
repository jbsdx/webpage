import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IdentityService} from '../../identity/services';
import {WhoAmI} from 'src/sdk/web-backend';

@Injectable({
  providedIn: 'root',
})
export class Store {
  whoAmI: BehaviorSubject<WhoAmI> = new BehaviorSubject(null);

  constructor(private identityService: IdentityService) {}

  async initApp() {
    this.loadWhoAmIData();
  }

  async loadWhoAmIData() {
    const whoAmI = await this.identityService.getWhoAmIData().toPromise();
    this.whoAmI.next(whoAmI);
  }
}
