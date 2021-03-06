import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';

declare var Rx, swal;

@Injectable()
export class WebServicesService {

  private BASE_URL = 'http://ijuju.aprosoftech.com/api/ijuju/';
  private MAIN_URL = 'http://admin.globeonwings.com/Api/globeOnWings/';
  private data: any;
  public airportList = [];
  public inProgress = false;
  User:any;
  Token:any;
  loginBy:any;
  login = {
    id: '',
    token:'',
    isAdmin: false
  };
  geo = {
    lat: '',
    lon: ''
  };
  constructor(private http: Http) {
    this.getLocation();
    // this.event.addListener("logout",()=>{
    //
    // })
  }


  // logout(){
  //   this._auth.logout().subscribe(
  //     (data) => {
  //       if(data){
  //         this.inProgress=true;
  //         setTimeout(()=>{
  //           this.User=null;
  //           this.Token=null;
  //           this.inProgress=false;
  //         },1000);
  //       }
  //     });
  // }

  attentionAlert(title, msg, type) {
    swal({
      title: title,
      text: msg,
      type: type,
      button: 'Ok',
      timer: 2000
    });
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        this.geo.lat = position.coords.latitude;
        this.geo.lon = position.coords.longitude;

      });
    } else {
     console.log('Geolocation is not supported by this browser.');
    }
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
      const u = this.BASE_URL + 'GetTicketBookingQueries';
      return this.postData(u,  word);
  }
  postExecutiveRemarks(data) {
    const u = this.BASE_URL + 'UpdateExecutiveRemarks';
    return this.postData(u, data);
  }
  postSignUp(data) {
    const u = this.MAIN_URL + 'SignUp';
    return this.postData(u, data);
  }
  postUserLogin(data) {
    const u = this.MAIN_URL + 'SignIn';
    return this.postData(u, data);
  }
}
