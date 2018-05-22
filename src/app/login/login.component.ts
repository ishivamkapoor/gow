import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {WebServicesService} from '../web-services.service';
import {AuthService} from 'angular2-social-login';
import {MAT_DIALOG_DATA, MatDialogRef, MatTabGroup} from '@angular/material';
import {RemarksDialogComponent} from '../remarks-dialog/remarks-dialog.component';

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
  signUpForm = {
    Email: '',
    Password: '',
    ConfirmPassword: '',
    FullName: '',
    MobileNo: '',
    terms: false
  };
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
  };
  constructor( public dialogRef: MatDialogRef<RemarksDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,private webService: WebServicesService, public _auth: AuthService) { }

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

    // this.webService.adminLogin(this.data).then((data: any) => {
    //   if (data ) {
    //     if (data.Response == 'Success') {
    //       this.webService.login.id = this.data.Email;
    //       this.webService.login.isAdmin = false;
    //
    //     } else {
    //       this.webService.attentionAlert('Attention', 'Invalid Email or Password', 'warning');
    //     }
    //   } else {
    //     this.webService.attentionAlert('Attention', 'Something Went Wrong!try again later', 'warning');
    //   }
    // });
  }
  signIn(provider) {
    if ( provider == 'none') {
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
      const obj = {
        'Email' : this.data.Email,
        'Password' : this.data.Password,
        'LoginType': 'Email'
      };
      this.webService.postUserLogin(obj).then((res: any) => {
        console.log(res);
        if (res && res.Response == 'Success') {

          this.webService.User = res.SignInl[0];
          this.webService.Token = res.Token;
          this.dialogRef.close(true);
        } else {
          this.webService.attentionAlert('Attention!', res.Response, 'warning');
        }
      });
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
      const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if ( this.signUpForm.FullName == '' ) {
        this.errorMsg = 'Enter Full Name';
        this.signUpErrors.FullName = true;
        return;
      } else {
        this.signUpErrors.FullName = false;
      }
      if ( this.signUpForm.Email == '' || !re.test(this.signUpForm.Email) ) {
        this.errorMsg = 'Enter Valid Email';
        this.signUpErrors.Email = true;
        return;
      } else {
        this.signUpErrors.Email = false;
      }
      if ( this.signUpForm.Password == '' ) {
        this.errorMsg = 'Enter Valid Password';
        this.signUpErrors.Password = true;
        return;
      } else {
        this.signUpErrors.Password = false;
      }
      if ( this.signUpForm.Password.length < 6 ) {
        this.errorMsg = 'Password length should be at least 6 characters';
        this.signUpErrors.Password = true;
        return;
      } else {
        this.signUpErrors.Password = false;
      }
      if ( this.signUpForm.ConfirmPassword != this.signUpForm.Password ) {
        this.errorMsg = 'Confirm Password and Password does not match';
        this.signUpErrors.ConfirmPassword = true;
        return;
      } else {
        this.signUpErrors.ConfirmPassword = false;
      }
      const rePhone = /[2-9]{2}\d{8}/;

      if (this.signUpForm.MobileNo == '' || this.signUpForm.MobileNo == null || !rePhone.test(this.signUpForm.MobileNo) || this.signUpForm.MobileNo.length != 10) {
        this.errorMsg = 'Enter Valid Mobile No';
        this.signUpErrors.MobileNo = true;
        return;
      } else {
        this.signUpErrors.MobileNo = false;
      }
      if (!this.signUpForm.terms) {
        this.errorMsg = 'Please Agree to the Terms of Use';
        this.signUpErrors.terms = true;
        return;
      } else {
        this.signUpErrors.terms = false;
      }

      const obj = {
          'FullName': this.signUpForm.FullName,
          'Email' : this.signUpForm.Email,
          'Password' : this.signUpForm.Password,
          'latitude' : this.webService.geo.lat,
          'longitude' : this.webService.geo.lon,
          'pushNotiToken' : '',
          'MobileNo' : this.signUpForm.MobileNo,
          'userReferalCode' : '',
          'LoginType' : 'Email',
          'profilePic' : '',
          'socialToken' : ''
      };
     this.webService.postSignUp(obj).then((res: any) => {
       console.log(res);
       if (res && res.Response == 'Success') {
        this.webService.attentionAlert('Sign Up Successfully', 'Please Login with your new Username Password', 'success');
         this.tabs.selectedIndex = 0;
       } else {
         this.webService.attentionAlert('Attention!', res.Response, 'warning');
       }
      });
  }

}
