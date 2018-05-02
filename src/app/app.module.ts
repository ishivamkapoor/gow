import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {AppRouter} from './app.router';
import {DateAdapter, MatExpansionModule, MatIconModule, MatListModule, MatNativeDateModule, MatSnackBarModule} from '@angular/material';
import {WebServicesService} from './web-services.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    AdminLoginComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    AppRouter
  ],
  providers: [WebServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
