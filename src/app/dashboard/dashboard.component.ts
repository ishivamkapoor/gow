import { Component, OnInit } from '@angular/core';
import {WebServicesService} from '../web-services.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import {FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {state, style, trigger, transition, animate} from '@angular/animations';
import {AuthService} from 'angular2-social-login';
declare var  swal: any;
declare var $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('bgChange', [
      state('0', style({'background-image': 'url(\'assets/wallpaper/w3.jpeg\')' })),
      state('1', style({'background-image': 'url(\'assets/wallpaper/w2.jpg\') '})),
      state('2', style({'background-image': 'url(\'assets/wallpaper/w1.jpg\') '})),
      transition('* => *', animate('600ms 0.2ms ease-in-out'))
    ])
  ]

})
export class DashboardComponent implements OnInit {
  bgwall: Number = 0;
  private currentDate = new Date();
  private input = document.getElementById('textInput');
   detail: any = {
    'Name': new FormControl(),
    'Email': new FormControl(),
    'Phone': new FormControl(),
    'SourceLoc':  new FormControl(),
    'DestinationLoc':   new FormControl(),
    'DepartureDate': new Date(),
    'ReturnDate': new Date(),
    'Adult': '1',
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
  constructor(public webService: WebServicesService,  public snackBar: MatSnackBar, public _auth: AuthService) {
    this.detail.SourceLoc.valueChanges.debounceTime(500).subscribe((word) => {
      this.webService.getAirportList(word);
    });
    this.detail.DestinationLoc.valueChanges.debounceTime(500).subscribe((word) => {
      this.webService.getAirportList(word);
    });

    setInterval(() => {
      this.bgwall = ((Math.floor((Math.random() * 10) + 1)) % 3);
    }, 6000);
  }

  ngOnInit() {
    // $(document).ready(function () {
    //   let owl = $('.owl-carousel');
    //   owl.owlCarousel({
    //     items:4,
    //     loop:true,
    //     margin:10,
    //     autoplay:true,
    //     autoplayTimeout:2000,
    //     autoplayHoverPause:true,
    //   });
    //   owl.trigger('play.owl.autoplay',[2000]);
    // });
    $(document).ready(function(){
      let owl = $('.owl-carousel');
      owl.owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        responsive:{
          0:{
            items:1,
            nav:true
          },
          600:{
            items:3,
            nav:false
          },
          1000:{
            items:3,
            nav:true,
            loop:false
          }
        }
      });
      $('#customPrevBtn').click(function() {
        owl.trigger('next.owl.carousel', [500]);
      })
// Go to the previous item
      $('#customNextBtn').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owl.trigger('prev.owl.carousel', [500]);
      })
    });
  }

  logOut() {

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
    console.log(this.detail.SourceLoc.value);

    if (this.detail.Name.value == '' || this.detail.Name.value == null) {
      this.errors.Name = true;
      return;
    } else {
      this.errors.Name = false;
    }
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (this.detail.Email.value == '' || this.detail.Email.value == null || !re.test(this.detail.Email.value)) {
      this.errors.Email = true;
      return;
    } else {
      this.errors.Email = false;
    }
    const rePhone = /[2-9]{2}\d{8}/;
    console.log(rePhone.test(this.detail.Phone.value));
    if (this.detail.Phone.value == '' || this.detail.Phone.value == null || !rePhone.test(this.detail.Phone.value) || this.detail.Phone.value.length != 10) {
      this.errors.Phone = true;
      return;
    } else {
      this.errors.Phone = false;
    }
    document.getElementById('closeModalButton').click();
    this.webService.postInsertTick(this.detail).then((data: any) => {
      if (data && data.Response == 'Success') {
        swal({
          title: 'Thank You!',
          html: 'Your Refrence No is <label style="font-weight: 200"><b>' + data.ReferenceNo + '</b></label>. You will be contacted shortly',
          type: 'success',
          button: 'Ok',
        });
        this.clearData();
      }
    });
  }

  verifySearchData() {
    if (this.detail.SourceLoc.value == '' || this.detail.SourceLoc.value == null ) {
      this.errors.SourceLoc = true;
      //this.snackBar.open('', '', {duration: 2000});
      this.attentionAlert('Please Enter Departure Location');
      return;
    } else {
      this.errors.SourceLoc = false;
    }
    if (this.detail.DestinationLoc.value == '' || this.detail.DestinationLoc.value == null) {
      // this.snackBar.open('Please Enter Destination Location', '', {duration: 2000});
      this.attentionAlert('Please Enter Destination Location');
      this.errors.DestinationLoc = true;
      return;
    } else {
      this.errors.DestinationLoc = false;
    }
    if (this.detail.DepartureDate == '' || this.detail.DepartureDate == null) {
      //this.snackBar.open('Please Enter Departure Date', '', {duration: 2000});
      this.attentionAlert('Please Enter Departure Date');
      this.errors.DepartureDate = true;
      return;
    } else {
      this.errors.DepartureDate = false;
    }
    if ( this.detail.DepartureDate < this.currentDate) {
      //this.snackBar.open('Please Enter Valid Departure Date', '', {duration: 2000});
      this.attentionAlert('Please Enter Valid Departure Date');
      this.errors.DepartureDate = true;
      return;
    } else {
      this.errors.DepartureDate = false;
    }
    if ( this.detail.TripType == 'Round Trip' && this.detail.DepartureDate > this.detail.ReturnDate) {
      // this.snackBar.open('Please Enter Valid Departure and Return Date', '', {duration: 2000});
      this.attentionAlert('Please Enter Valid Departure and Return Date');
      this.errors.ReturnDate = true;
      return;
    } else {
      this.errors.ReturnDate = false;
    }
    if (this.detail.Adult == '0' && this.detail.Child == '0' && this.detail.Infant == '0') {
      // this.snackBar.open('Please Enter Valid Number of Passengers', '', {duration: 2000});
      this.attentionAlert('Please Enter Valid Number of Passengers');
      return;
    }
    document.getElementById('openModalButton').click();
  }
  attentionAlert(msg) {
    swal({
      title: 'Attention!',
      text: msg,
      type: 'warning',
      button: 'Ok',
      timer: 2000
    });
  }
  clearAirports() {
    this.webService.airportList = [];
  }
  clearData() {
    this.detail = {
      'Name': new FormControl(),
      'Email': new FormControl(),
      'Phone': new FormControl(),
      'SourceLoc':  new FormControl(),
      'DestinationLoc':   new FormControl(),
      'DepartureDate': new Date(),
      'ReturnDate': new Date(),
      'Adult': '0',
      'Child': '0',
      'Infant': '0',
      'ClassType': 'All',
      'TripType': 'One Way'
    };
  }
}
