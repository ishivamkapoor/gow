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
    Email: '',
    Password: '',
  };
  signUpForm={
    Email: '',
    Password: '',
    ConfirmPassword: '',
    FullName: '',
    MobileNo: '',
    terms: false
  }
  signInErrors = {
    Email: false,
    Password: false
  };
  signUpErrors = {
    Email: false,
    Password: false,
    ConfirmPassword: false,
    FullName: false,
    MobileNo: false,
    terms: false
  }
  constructor(private webService: WebServicesService, public _auth: AuthService) { }

  ngOnInit() {
  }
  postlogin() {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if ( this.data.Email == '' || !re.test(this.data.Email) ) {
      this.errorMsg = 'Enter Valid Email';
      this.signInErrors.Email = true;
      return;
    } else {
      this.signInErrors.Email = false;
    }

    if ( this.data.Password == '' ) {
      // this.snackBar.open('Please Enter Valid Departure and Return Date', '', {duration: 2000});
      this.errorMsg = 'Enter Valid Password';
      this.signInErrors.Password = true;
      return;
    } else {
      this.signInErrors.Password = false;
    }

    this.webService.adminLogin(this.data).then((data: any) => {
      if (data ) {
        if (data.Response == 'Success') {
          this.webService.login.id = this.data.Email;
          this.webService.login.isAdmin = false;

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
