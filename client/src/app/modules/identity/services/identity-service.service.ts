import {Injectable} from '@angular/core';
import {WhoamiControllerService, PGP} from 'src/sdk/web-backend';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  constructor(private whoamiApi: WhoamiControllerService) {}

  getPGPKeys(): Observable<PGP> {
    return this.whoamiApi.whoamiControllerWhoami();
  }
}
