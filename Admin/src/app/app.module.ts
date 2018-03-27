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

import { CourcelevelComponent } from './courcelevel/courcelevel.component';
import { CourcelevellistComponent } from './courcelevellist/courcelevellist.component';
import { CourcelevelService } from './services/courcelevel.service';
import { CourseComponent } from './course/course.component';
import { CourselistComponent } from './courselist/courselist.component';
import { CourseService } from './services/course.service';

import { Globals } from './globals';
import { IndustryComponent } from './industry/industry.component';
import { IndustrylistComponent } from './industrylist/industrylist.component';
import { IndustryService } from './services/industry.service';
import { UserComponent } from './user/user.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserService } from './services/user.service';
import { StateService } from './services/state.service';
import { CompanyService } from './services/company.service';
import { StateComponent } from './state/state.component';
import { StatelistComponent } from './statelist/statelist.component';
import { CompanyComponent } from './company/company.component';
import { CompanylistComponent } from './companylist/companylist.component';
import { UserroleComponent } from './userrole/userrole.component';
import { UserrolelistComponent } from './userrolelist/userrolelist.component';

import { UserroleService } from './services/userrole.service';
import { CountryComponent } from './country/country.component';
import { CountrylistComponent } from './countrylist/countrylist.component';
import { CountryService } from './services/country.service';



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
    CompetencyAreaListComponent,
	CourcelevelComponent,
	CourcelevellistComponent,
	CourseComponent,
	CourselistComponent,
	IndustryComponent,
	IndustrylistComponent,
	 UserComponent,
    UserlistComponent,
    StateComponent,
    StatelistComponent,
    CompanyComponent,
	CompanylistComponent,
	UserroleComponent,
	UserrolelistComponent,
	CountryComponent,
	CountrylistComponent

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
        path : 'industry/add',
        component : IndustryComponent,
		canActivate : [AuthGuard]
       
      },
	  {
			path : 'industry/list',
			component : IndustrylistComponent,
			canActivate : [AuthGuard]
	  },
	  {
			path : 'industry/edit/:id',
			component : IndustryComponent,
			canActivate : [AuthGuard]
	  },
	   {
        path : 'userrole/add',
        component : UserroleComponent,
		canActivate : [AuthGuard] 
      },
	   {
        path : 'userrole/list',
        component : UserrolelistComponent,
		canActivate : [AuthGuard] 
      },
	  {
        path : 'userrole/edit/:id',
        component : UserroleComponent,
		canActivate : [AuthGuard] 
      },
	  {
        path : 'user/edit/:id',
        component : UserComponent,
		canActivate : [AuthGuard] 
      },
	  {
        path : 'users/list',
        component : UserlistComponent,
		canActivate : [AuthGuard] 
      },
	   {
        path : 'state/add',
        component : StateComponent,
		canActivate : [AuthGuard] 
      },
	  {
        path : 'state/list',
        component : StatelistComponent,
		canActivate : [AuthGuard] 
      },
	  {
        path : 'state/edit/:id',
        component : StateComponent,
		canActivate : [AuthGuard] 
      },
	  {
        path : 'company/add',
        component : CompanyComponent,
		canActivate : [AuthGuard] 
      },
	  {
        path : 'company/list',
        component : CompanylistComponent,
		canActivate : [AuthGuard] 
      },
	   {
        path : 'company/edit/:id',
        component : CompanyComponent,
		canActivate : [AuthGuard] 
      },

	  {
        path : 'country/add',
        component : CountryComponent,
		canActivate : [AuthGuard]
       
      },
	  {
			path : 'country/list',
			component : CountrylistComponent,
			canActivate : [AuthGuard]
	  },
	  {
			path : 'country/edit/:id',
			component : CountryComponent,
			canActivate : [AuthGuard]
	  },

      {
        path : '**',
        redirectTo : 'dashboard'
      }
	  ])
  ],

  providers: [Globals,AuthService,AuthGuard,DomainService,CompetencyAreaService,CourcelevelService,CourseService,IndustryService,CountryService,UserService,StateService,CompanyService,UserroleService],
  // providers: [Globals,AuthService,AuthGuard,DomainService,CompetencyAreaService,CourcelevelService,CourseService,IndustryService,CountryService],

  bootstrap: [AppComponent]
})
export class AppModule { }
