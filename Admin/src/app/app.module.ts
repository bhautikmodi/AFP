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
import { DomainComponent } from './domain/domain.component';
import { DomainListComponent } from './domain-list/domain-list.component';
import { CompetencyAreaComponent } from './competency-area/competency-area.component';
import { CompetencyAreaListComponent } from './competency-area-list/competency-area-list.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { DomainService } from './services/domain.service';
import { CompetencyAreaService } from './services/competency-area.service';

import { Globals } from './globals';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    LeftMenuComponent,
    DashboardComponent,
    DomainComponent,
    DomainListComponent,
    CompetencyAreaComponent,
    CompetencyAreaListComponent
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
        path : 'domain/add',
        component : DomainComponent,
        canActivate : [AuthGuard]
      },
      {
        path : 'domain/edit/:id',
        component : DomainComponent,
        canActivate : [AuthGuard]
      },
      {
        path : 'domain/list',
        component : DomainListComponent,
        canActivate : [AuthGuard]
      },
      {
        path : 'competency-area/add',
        component : CompetencyAreaComponent,
        canActivate : [AuthGuard]
      },
      {
        path : 'competency-area/edit/:id',
        component : CompetencyAreaComponent,
        canActivate : [AuthGuard]
      },
      {
        path : 'competency-area/list',
        component : CompetencyAreaListComponent,
        canActivate : [AuthGuard]
      },
      {
        path : '**',
        redirectTo : 'dashboard'
      }
	  ])
  ],
  providers: [Globals,AuthService,AuthGuard,DomainService,CompetencyAreaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
