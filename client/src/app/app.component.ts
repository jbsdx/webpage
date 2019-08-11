import { Component, OnInit } from "@angular/core";
import { PingControllerService, LoginControllerService } from "src/sdk";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "client";

  constructor(
    readonly newsApi: PingControllerService,
    readonly loginApi: LoginControllerService
  ) {}

  async ngOnInit() {
    const count = await this.newsApi
      .pingControllerTestIsAuthenticated()
      .toPromise();
    console.log("COUNT", count);
  }
}
