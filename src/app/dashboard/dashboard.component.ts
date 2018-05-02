import { Component, OnInit } from '@angular/core';
import {WebServicesService} from '../web-services.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import {FormControl} from '@angular/forms';
declare var Rx;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private input = document.getElementById('textInput');
   detail: any = {
    'Name': new FormControl(),
    'Email': new FormControl(),
    'Phone': new FormControl(),
    'SourceLoc':  new FormControl(),
    'DestinationLoc':   new FormControl(),
    'DepartureDate': new FormControl(),
    'ReturnDate': new FormControl(),
    'Adult': '0',
    'Child': '0',
    'Infant': '0',
    'ClassType': 'All',
    'TripType': 'One Way'
  };
   errors: any = {
     'Name': false,
     'Email': false,
     'Phone': false,
     'SourceLoc':  false,
     'DestinationLoc':  false,
     'DepartureDate': false,
     'ReturnDate': false,
     'Adult': false,
     'Child': false,
     'Infant': false,
     'ClassType': false,
     'TripType': false
   };
  constructor(private webService: WebServicesService) {
    this.detail.SourceLoc.valueChanges.debounceTime(500).subscribe((word) => {
      this.webService.getAirportList(word);
    });
    this.detail.DestinationLoc.valueChanges.debounceTime(500).subscribe((word) => {
      this.webService.getAirportList(word);
    });
  }

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
    if (this.detail.SourceLoc.isEmpty()) {
      this.errors.SourceLoc = true;
      return;
    } else {
      this.errors.SourceLoc = false;
    }
    if (this.detail.DestinationLoc.isEmpty()) {
      this.errors.DestinationLoc = true;
      return;
    } else {
      this.errors.DestinationLoc = false;
    }
    if (this.detail.DepartureDate.isEmpty()) {
      this.errors.DepartureDate = true;
      return;
    } else {
      this.detail.DepartureDate = false;
    }
    if (this.detail.TripType == 'Return Trip' && this.detail.DepartureDate > this.detail.ReturnDate) {
      this.errors.ReturnDate = true;
      return;
    } else {
      this.detail.ReturnDate = false;
    }
    if (this.detail.Name.isEmpty()) {
      this.errors.Name = true;
      return;
    } else {
      this.errors.Name = false;
    }
    if (this.detail.Email.isEmpty()) {
      this.errors.Email = true;
      return;
    } else {
      this.errors.Email = false;
    }
    if (this.detail.Phone.isEmpty()) {
      this.errors.Phone = true;
      return;
    } else {
      this.errors.Phone = false;
    }

    this.webService.postInsertTick().then((data) => {
        console.log(data);
    });
  }
}
