import {Component, OnInit, Input} from '@angular/core';
import {IdentityLabel} from '../../models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-identity-label',
  templateUrl: './identity-label.component.html',
  styleUrls: ['./identity-label.component.scss'],
})
export class IdentityLabelComponent implements OnInit {
  @Input() identityLabel: IdentityLabel;

  constructor(private router: Router) {}

  async ngOnInit() {}

  labelClick() {
    if (this.identityLabel.link) {
      if (this.identityLabel.linkExternal) {
        window.open(this.identityLabel.link, this.identityLabel.key);
      } else {
        this.router.navigateByUrl(this.identityLabel.link);
      }
    }
  }
}
