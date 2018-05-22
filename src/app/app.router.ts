import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';

const appRoutes: Routes =[
  {path: '*', component: DashboardComponent},
  {path: '', component: DashboardComponent},
  {path: 'admin/dashboard', component: AdminDashboardComponent},
  {path: 'admin', component: AdminLoginComponent},
]
@NgModule({
  declarations:[],
  imports:[RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRouter {

}
