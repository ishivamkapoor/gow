import { Component, OnInit } from '@angular/core';
import {WebServicesService} from '../web-services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private webService: WebServicesService, private router: Router) { }

  ngOnInit() {
    if (!this.webService.login.isAdmin) {
      this.webService.attentionAlert('Please Login First');
      this.router.navigateByUrl('/admin');
    }
  }

}
