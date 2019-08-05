import { Component, OnInit } from '@angular/core';
import { NewsControllerService } from 'src/sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(readonly newsApi: NewsControllerService) {
    

  }

  async ngOnInit() {
    const count = await this.newsApi.newsControllerCount().toPromise();
    console.log('COUNT', count);
  }

}
