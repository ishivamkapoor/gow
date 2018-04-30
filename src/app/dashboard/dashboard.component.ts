import { Component, OnInit } from '@angular/core';
import {WebServicesService} from '../web-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private detail: any = {
    'Name': 'Raj',
    'Email': 'er.rajnarayan@gmail.com',
    'Phone': '8283832639',
    'SourceLoc': 'IGT, Delhi',
    'DestinationLoc': 'Perth, Australia',
    'DepartureDate': '2018-05-06 05:00:54.447',
    'ReturnDate': '2018-05-09 05:00:54.447',
    'Adult': '0',
    'Child': '0',
    'Infant': '0',
    'ClassType': 'Business'
  };
  constructor(private webService: WebServicesService) { }

  ngOnInit() {
  }
  adults(x) {
    if (x) {
      this.detail.Adult++;
    } else {
      this.detail.Adult = (this.detail.Adult > 0) ? (--this.detail.Adult) : this.detail.Adult;
    }
  }
  child(x) {
    if (x) {
      this.detail.Child++;
    } else {
      this.detail.Child = (this.detail.Child > 0) ? (--this.detail.Child) : this.detail.Child;
    }
  }
  infant(x) {
    if (x) {
      this.detail.Infant++;
    } else {
      this.detail.Infant = (this.detail.Infant > 0) ? (--this.detail.Infant) : this.detail.Infant;
    }
  }

  postTicketDetails() {
    // console.log(this.webService.postInsertTick());
    this.webService.postInsertTick().then((data)=>{
        console.log(data);
    });
  }
}
