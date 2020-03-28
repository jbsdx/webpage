import {Injectable} from '@angular/core';
import {WhoamiControllerService, WhoAmI} from 'src/sdk/web-backend';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(private whoamiApi: WhoamiControllerService) {}

  getWhoAmIData(): Observable<WhoAmI> {
    return this.whoamiApi.whoamiControllerWhoami();
  }
}
