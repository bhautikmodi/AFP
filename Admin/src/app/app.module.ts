import { BrowserModule } from '@angular/platform-browser';
import { Component,NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/Forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

import { Globals } from './globals';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    LeftMenuComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
	HttpModule,
	FormsModule,
	RouterModule.forRoot([		
      {
        path : '',
        component : DashboardComponent,
        canActivate : [AuthGuard]
      },
      {
        path : 'dashboard',
        component : DashboardComponent,
        canActivate : [AuthGuard]
      },
      {
        path : 'login',
        component : LoginComponent,
        canActivate : [AuthGuard]
      },
      {
        path : '**',
        redirectTo : 'dashboard'
      }
	  ])
  ],
  providers: [Globals,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
