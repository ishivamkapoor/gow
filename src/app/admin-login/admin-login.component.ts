import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  private data = {
    email: '',
    password: ''
  };
  constructor(private router: Router) { }

  ngOnInit() {
  }

  openDash() {
    this.router.navigateByUrl('/admin/dashboard');
  }

}
