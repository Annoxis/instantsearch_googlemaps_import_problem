import { Component } from '@angular/core';
import { InstantSearchService } from './instantSearchService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';

  public constructor(
    private instantSearchService: InstantSearchService
  ) {
  }

  ngAfterContentInit() {
    this.instantSearchService.start();
  }

}