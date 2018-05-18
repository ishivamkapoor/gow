import { Component, OnInit } from '@angular/core';
import {WebServicesService} from '../web-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsg = '';
  data = {
    email: '',
    password: ''
  };
  errors = {
    email: false,
    password: false
  };
  constructor(private webService: WebServicesService) { }

  ngOnInit() {
  }
  postlogin() {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if ( this.data.email == '' || !re.test(this.data.email) ) {
      this.errorMsg = 'Enter Valid Email';
      this.errors.email = true;
      return;
    } else {
      this.errors.email = false;
    }

    if ( this.data.password == '' ) {
      // this.snackBar.open('Please Enter Valid Departure and Return Date', '', {duration: 2000});
      this.errorMsg = 'Enter Valid Password';
      this.errors.password = true;
      return;
    } else {
      this.errors.password = false;
    }

    this.webService.adminLogin(this.data).then((data: any) => {
      if (data ) {
        if (data.Response == 'Success') {
          this.webService.login.id = this.data.email;
          this.webService.login.isAdmin = true;

        } else {
          this.webService.attentionAlert('Attention', 'Invalid Email or Password', 'warning');
        }
      } else {
        this.webService.attentionAlert('Attention', 'Something Went Wrong!try again later', 'warning');
      }
    });
  }
}
