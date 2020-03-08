import { Component, OnInit } from '@angular/core';
import { LoginControllerService, PingControllerService } from 'src/sdk/web-backend';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(
    readonly pingApi: PingControllerService,
    readonly loginApi: LoginControllerService,
  ) { }

  async ngOnInit() {
  }
}
