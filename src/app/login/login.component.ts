import {Component, OnInit, ViewChild} from '@angular/core';
import {WebServicesService} from '../web-services.service';
import {AuthService} from 'angular2-social-login';
import {MatTabGroup} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('tabs') tabs: MatTabGroup;
  sub: any;
  errorMsg = '';
  data = {
    email: '',
    password: '',
    FullName:'',
  };
  errors = {
    email: false,
    password: false
  };
  constructor(private webService: WebServicesService, public _auth: AuthService) { }

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
  signIn(provider) {
    if ( provider == 'none') {

    } else {
      this.sub = this._auth.login(provider).subscribe(
        (data: any) => {
              console.log(data);
          const obj = {
            'FullName': data.name,
            'Email' : data.email,
            'Password' : '',
            'latitude' : this.webService.geo.lat,
            'longitude' : this.webService.geo.lon,
            'pushNotiToken' : '',
            'MobileNo' : '',
            'userReferalCode' : '',
            'LoginType' : (provider == 'google') ? 'GP' : 'FB',
            'profilePic' : data.image,
            'socialToken' : data.token
          };
          this.webService.postSignUp(obj).then((res: any) => {
              if (res && res.Response == 'Success') {
                this.webService.login.id = res.UserId;
                this.webService.login.token = data.token;
              }
          });
        }
      );
    }
  }

    signUp() {
      const obj = {
          'FullName': '',
          'Email' : '',
          'Password' : '',
          'latitude' : '',
          'longitude' : '',
          'pushNotiToken' : '',
          'MobileNo' : '',
          'userReferalCode' : '',
          'LoginType' : 'Email',
          'profilePic' : '',
          'socialToken' : ''
      };
     this.webService.postSignUp(obj).then((res: any) => {
       if (res && res.Response == 'Success') {
        this.webService.attentionAlert('Sign Up Successfully', 'Please Login with your new Username Password', 'success');
         this.tabs.selectedIndex = 0;
       }
      });
  }

}
