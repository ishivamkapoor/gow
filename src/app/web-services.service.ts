import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import {HttpHeaders} from '@angular/common/http';

declare var Rx, swal;

@Injectable()
export class WebServicesService {

  private BASE_URL = 'http://ijuju.aprosoftech.com/api/ijuju/';
  private data: any;
  public airportList = [];
  public inProgress = false;
  login = {
    id: '',
    isAdmin: false
  };
  constructor(private http: Http) { }


  attentionAlert(msg) {
    swal({
      title: 'Attention!',
      text: msg,
      type: 'warning',
      button: 'Ok',
      timer: 2000
    });
  }
  // HTTP REQUEST MAIN FUNCTION TO CALL THE WEBSERVICES EVERY IS ROUTED THROUGH THESE GET POST METHOD

  getData(u) {
    this.inProgress = true;
    return new Promise(resolve => {

      this.http.get(u)
        .map(res => res.json())
        .subscribe(data => {
          this.inProgress = false;
          this.data = data;
          resolve(this.data);
        }, err => {
          this.inProgress = false;
          console.log('error Occured');
          // this.presentToast('Please Check Internet Connection or Try Again Later!');
          resolve(false);
        });
    });
  }

  postData(u, data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.inProgress = true;
    return new Promise(resolve => {

      this.http.post(u,
        data
        ,
        {
          headers: headers
        })
        .map(res => res.json())
        .subscribe((data: any) => {
          this.inProgress = false;
          this.data = data;
          resolve(this.data);
        }, err => {
          this.inProgress = false;
          console.log('error Occured');

          // this.presentToast('Please Check Internet Connection or Try Again Later!');
          resolve(false);
        });
    });
  }

  postInsertTick(data) {
    const u = this.BASE_URL + 'InsertTicketQuery';
    let date = data.DepartureDate;
    date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' +
    ('00' + date.getUTCHours()).slice(-2) + ':' +
    ('00' + date.getUTCMinutes()).slice(-2) + ':' +
    ('00' + date.getUTCSeconds()).slice(-2);
    let date2 = data.ReturnDate;
    date2 = date2.getUTCFullYear() + '-' +
      ('00' + (date2.getUTCMonth() + 1)).slice(-2) + '-' +
      ('00' + date2.getUTCDate()).slice(-2) + ' ' +
      ('00' + date2.getUTCHours()).slice(-2) + ':' +
      ('00' + date2.getUTCMinutes()).slice(-2) + ':' +
      ('00' + date2.getUTCSeconds()).slice(-2);

    const obj = {
      'Name': data.Name.value,
      'Email': data.Email.value,
      'Phone': data.Phone.value,
      'SourceLoc': data.SourceLoc.value,
      'DestinationLoc': data.DestinationLoc.value,
      'DepartureDate': date ,
      'ReturnDate': date2,
      'Adult': data.Adult,
      'Child': data.Child,
      'Infant': data.Infant,
      'ClassType': data.ClassType,
      'TripType': data.TripType
    };
    return this.postData(u, obj);
  }
  getAirportList(word) {
    console.log(word);
    const u = 'http://ijuju.aprosoftech.com/api/ijuju/GetAirportList';
    if (word != '' && word.length > 2) {

      this.http.post(u, {searchText: word})
        .map(res => res.json())
        .subscribe(list => {
          console.log(list);
          this.airportList = list.List;
          // this.airportList = list.List.filter((port) => {
          //   return port.label.toLowerCase().indexOf(word.toLowerCase()) > -1;
          // });
        }, err => {
          console.log('error Occured');
        });
    }
  }
  adminLogin(data) {
    const u = this.BASE_URL + 'SignIn';
    const obj = {
      Email: data.email,
      Password: data.password,
      LoginType: 'Email'
    };
    return this.postData(u, obj);
  }
  getTicketQueries(word) {
      let u = this.BASE_URL + 'GetTicketBookingQueries';
      return this.postData(u,  word);
  }

}
