import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class WebServicesService {

  private BASE_URL = 'http://ijuju.aprosoftech.com/api/ijuju/';
  private data: any;
  public airportList = [];
  public inProgress = false;
  constructor(private http: Http) { }

  // HTTP REQUEST MAIN FUNCTION TO CALL THE WEBSERVICES EVERY IS ROUTED THROUGH THESE GET POST METHOD

  getData(u) {
    this.inProgress = true;
    return new Promise(resolve => {
      setTimeout(() => {
        this.inProgress = false;
      }, 1000);
      this.http.get(u)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, err => {
          console.log('error Occured');
          // this.presentToast('Please Check Internet Connection or Try Again Later!');
          resolve(false);
        });
    });
  }

  postData(u, data) {
    this.inProgress = true;
    return new Promise(resolve => {
      setTimeout(() => {
        this.inProgress = false;
      }, 1000);
      this.http.post(u,
        data
        ,
        {
          headers: new Headers({'Content-Type': 'application/json'})
        })
        .map(res => res.json())
        .subscribe((data: any) => {
          this.data = data;
          resolve(this.data);
        }, err => {
          console.log('error Occured');

          // this.presentToast('Please Check Internet Connection or Try Again Later!');
          resolve(false);
        });
    });
  }

  postInsertTick() {
    const u = this.BASE_URL + 'InsertTicketQuery';
    const obj = {
      'Name': 'Raj',
      'Email': 'er.rajnarayan@gmail.com',
      'Phone': '8283832639',
      'SourceLoc': 'IGT, Delhi',
      'DestinationLoc': 'Perth, Australia',
      'DepartureDate': '2018-05-06 05:00:54.447',
      'ReturnDate': '2018-05-09 05:00:54.447',
      'Adult': '1',
      'Child': '0',
      'Infant': '0',
      'ClassType': 'Business'
    };
    return this.postData(u, obj);
  }
  getAirportList(word) {
    console.log(word);
    const u = 'http://www.flightsservices.com/general/get_flight_suggestions';
    this.http.get(u)
      .map(res => res.json())
      .subscribe(list => {
        this.airportList = list.filter((port) => {
          return port.label.toLowerCase().indexOf(word.toLowerCase()) > -1;
        });
      }, err => {
        console.log('error Occured');
      });
  }
}
