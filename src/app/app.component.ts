import { Component } from '@angular/core';
import {WebServicesService} from './web-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public webService: WebServicesService) {
    console.log(this.webService.inProgress);
  }
}
