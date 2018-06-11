import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {AuthService} from 'angular2-social-login';
import {WebServicesService} from '../web-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public dialog: MatDialog, public webService: WebServicesService, public _auth: AuthService) { }

  ngOnInit() {
  }
  openLogin() {
    const dialogRemarks = this.dialog.open(LoginComponent, { width: '400px'});
    dialogRemarks.afterClosed().subscribe(() => {
      // if (result) {
      //   // this.webService.attentionAlert('Saved Successfully', 'Executive Remarks has been saved Successfully', 'success');
      // }
    });
  }
  logout() {
    if (this.webService.loginBy != 'Email') {
      this._auth.logout().subscribe(
        (data) => {
          if (data) {
            this.webService.inProgress = true;
            setTimeout(() => {
              this.webService.User = null;
              this.webService.Token = null;
              this.webService.inProgress = false;
            }, 1000);
          }
        });
    } else {
      this.webService.inProgress = true;
      setTimeout(() => {
        this.webService.User = null;
        this.webService.Token = null;
        this.webService.inProgress = false;
      }, 1000);
    }
  }
  openCheckout() {
    let handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: 2000
    });
  }
}
