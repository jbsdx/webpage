import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ApiModule, Configuration } from "src/sdk";
import { HttpClientModule } from "@angular/common/http";

const config = new Configuration();
config.basePath = "http://localhost:3000/";
config.accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvbmFzX2JlbnoiLCJpYXQiOjE1NjU0NTc5NTJ9.figLyP12tr6ilKdLRtWem7RpabuM7vzxmThH-ESbdkc";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ApiModule.forRoot(() => config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
