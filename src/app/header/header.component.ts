import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../login/login.component';
import {WebServicesService} from '../web-services.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public dialog: MatDialog,public webService:WebServicesService) { }

  ngOnInit() {
  }
  openLogin() {
    const dialogRemarks = this.dialog.open(LoginComponent, { width: '500px'});
    dialogRemarks.afterClosed().subscribe(() => {
      // if (result) {
      //   // this.webService.attentionAlert('Saved Successfully', 'Executive Remarks has been saved Successfully', 'success');
      // }
    });
  }
}
