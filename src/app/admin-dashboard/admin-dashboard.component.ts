import { Component, OnInit } from '@angular/core';
import {WebServicesService} from '../web-services.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {RemarksDialogComponent} from '../remarks-dialog/remarks-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  request = {
    searchText: '',
    PageNumber: 1
  };
  totalRecords: Number;
  queryList = [];
  constructor(private webService: WebServicesService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    if (!this.webService.login.isAdmin) {
      this.webService.attentionAlert('Please Login First', '', 'warning');
      this.router.navigateByUrl('/admin');
    }
    this.getTicketQueries(this.request);
  }
  getTicketQueries(word) {
    this.webService.getTicketQueries(word).then((data: any) => {
        if (data && data.Response == 'Success') {
          this.totalRecords = data.TotalRecords;
          this.queryList = data.List;
          console.log(data);
        }
    });
  }
  openRemarks(obj) {
    const dialogRemarks = this.dialog.open(RemarksDialogComponent, { width: '500px', data: {obj: obj}});
    dialogRemarks.afterClosed().subscribe((result) => {
      if (result) {
        this.webService.attentionAlert('Saved Successfully', 'Executive Remarks has been saved Successfully', 'success');
        this.getTicketQueries(this.request);
      }
    });
  }
  onEnter(e) {
    if (e.keyCode === 13) {
     this.getTicketQueries(this.request);
    }
  }
  nextRecords() {
    this.request.PageNumber++;
    this.getTicketQueries(this.request);
  }

}
