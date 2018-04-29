import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const appRoutes: Routes =[
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '*', component: DashboardComponent},
  {path: '', component: DashboardComponent}

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
