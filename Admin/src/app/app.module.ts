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
import { CourcelevelService } from './services/courcelevel.service';
import { CourseService } from './services/course.service';

import { Globals } from './globals';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfigurationlistComponent } from './configurationlist/configurationlist.component';
import { CourcelevelComponent } from './courcelevel/courcelevel.component';
import { CourcelevellistComponent } from './courcelevellist/courcelevellist.component';
import { CourseComponent } from './course/course.component';
import { CourselistComponent } from './courselist/courselist.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    LeftMenuComponent,
    DashboardComponent,
    ConfigurationComponent,
    ConfigurationlistComponent,
    CourcelevelComponent,
    CourcelevellistComponent,
	CourseComponent,
    CourselistComponent
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
        path : 'courselevel/add',
        component : CourcelevelComponent,
		canActivate : [AuthGuard]
       
      },
	  {
			path : 'courselevel/list',
			component : CourcelevellistComponent,
			canActivate : [AuthGuard]
	  },
	  {
			path : 'courselevel/edit/:id',
			component : CourcelevelComponent,
			canActivate : [AuthGuard]
	  },
	  {
        path : 'course/add',
        component : CourseComponent,
		canActivate : [AuthGuard]
       
      },
	  {
			path : 'course/list',
			component : CourselistComponent,
			canActivate : [AuthGuard]
	  },
	  {
			path : 'course/edit/:id',
			component : CourseComponent,
			canActivate : [AuthGuard]
	  },
      {
        path : '**',
        redirectTo : 'dashboard'
      }
	  
	  ])
  ],
  providers: [Globals,AuthService,AuthGuard,CourcelevelService,CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
