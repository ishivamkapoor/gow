import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private detail: any = {
    adults: 0
  };
  constructor() { }

  ngOnInit() {
  }
  adults(x) {
    if (x) {
      this.detail.adults++;
    } else {
      this.detail.adults = (this.detail.adults > 0) ? (--this.detail.adults) : this.detail.adults;
    }
  }
}
