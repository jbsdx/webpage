import {Component, OnInit, Input} from '@angular/core';
import {faKey} from '@fortawesome/free-solid-svg-icons';
import {PGP} from 'src/sdk/web-backend';

@Component({
  selector: 'app-pgp-label',
  templateUrl: './pgp-label.component.html',
  styleUrls: ['./pgp-label.component.scss'],
})
export class PGPLabelComponent implements OnInit {
  @Input() pgp: PGP;

  faKey = faKey;
  constructor() {}

  async ngOnInit() {}
}
