import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {WebServicesService} from '../web-services.service';

@Component({
  selector: 'app-remarks-dialog',
  templateUrl: './remarks-dialog.component.html',
  styleUrls: ['./remarks-dialog.component.css']
})
export class RemarksDialogComponent implements OnInit {

  sendResponse = {
    ExecutiveRemarks: '',
    IsAgree: 'Yes',
    Id: ''
  };
  errors = {
    ExecutiveRemarks: false
  };
  constructor( public dialogRef: MatDialogRef<RemarksDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any, private webService: WebServicesService) {

      this.sendResponse.ExecutiveRemarks = this.data.obj.ExecutiveRemarks;
//        console.log(this.data);
        this.sendResponse.Id = this.data.obj.Id;
    }

  ngOnInit() {
  }
  saveResponse() {
    if (this.sendResponse.ExecutiveRemarks == '') {
      this.errors.ExecutiveRemarks = true;
      return;
    } else {
      this.errors.ExecutiveRemarks = false;
    }
    this.webService.postExecutiveRemarks(this.sendResponse).then((data:any) => {
        if (data && data.Response == 'Success') {
          this.dialogRef.close(true);
        }
    });
  }
}
