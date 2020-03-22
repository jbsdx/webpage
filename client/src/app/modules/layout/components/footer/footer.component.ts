import {Component, OnInit, Input} from '@angular/core';
import * as moment from 'moment';
import {PGP} from 'src/sdk/web-backend';
import {Store} from 'src/app/modules/core/store/store.service';

const CREATION_DATE = moment('2019-08-05');

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() pgp: PGP;

  footerDateString: string;

  constructor() {}

  ngOnInit() {
    this.footerDateString = this.creationDate();
  }

  private creationDate(): string {
    const dateFrom = moment(CREATION_DATE);
    const dateTo = moment();
    return `${dateFrom.year()} - ${dateTo.year()}`;
  }
}
