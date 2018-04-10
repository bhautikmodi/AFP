import { BrowserModule } from '@angular/platform-browser';
import { Globals } from './globals';
import { Component,NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/Forms';
import { HttpModule } from '@angular/http';

import { AuthService } from './services/auth.service'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { InvitationComponent } from './invitation/invitation.component';
import { InvitationService } from './services/invitation.service';
import { FindcompanyComponent } from './findcompany/findcompany.component';
import { FindcompanyService } from './services/findcompany.service';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './services/register.service';
import { WelcomeregisterComponent } from './welcomeregister/welcomeregister.component';

import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotpasswordService } from './services/forgotpassword.service';
import { LoginComponent } from './login/login.component';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { ResetpassService } from './services/resetpass.service';
import { ChangepassComponent } from './changepass/changepass.component';
import { ChangepassService } from './services/changepass.service';



import { AssessmentDetailsComponent } from './assessment-details/assessment-details.component';
import { AssessmentDetailsService } from './services/assessment-details.service';


import { AssessmentDetailsComponent } from './assessment-details/assessment-details.component';
import { AssessmentDetailsService } from './services/assessment-details.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashbordComponent,
    FooterComponent,
    ContactusComponent,
    InvitationComponent,
    FindcompanyComponent,
    RegisterComponent,
    WelcomeregisterComponent,

	ForgotpasswordComponent,
    LoginComponent,
    ResetpassComponent,

    ChangepassComponent,

    ChangepassComponent,

    AssessmentDetailsComponent


  ],
  imports: [
    BrowserModule,
	HttpModule,
	FormsModule,
	RouterModule.forRoot([		
		{
			path : '',
			component : DashbordComponent,
			
		},
		{
			path : 'contactus',
			component : ContactusComponent,
		},
		{
			path : 'invitation',
			component : InvitationComponent,
		},		
		{
			path : 'findcompany',
			component : FindcompanyComponent,
		},
		{
			path : 'register',
			component : RegisterComponent,
			
		},
		{
        path : 'register/edit/:id',
        component : RegisterComponent,
        
		},
		{
			path : 'welcome_register',
			component : WelcomeregisterComponent,

		},
		{
			path : 'changepass',
			component : ChangepassComponent,
		},
		{
			//path : 'resetpass',
			path : 'resetpass/:id',
			component : ResetpassComponent,
		},
		
		{
			path : 'forgotpassword',
			component : ForgotpasswordComponent,

			//canActivate : [AuthGuard]

		},{
			path : 'assessment_details',
			component : AssessmentDetailsComponent

		},
{
			path : 'assessment_details',
			component : AssessmentDetailsComponent,


		},
		{
			path : '**',
			redirectTo : 'DashbordComponent',
		},
		{
			path : 'login',
			component : LoginComponent
		}
	])
  ],

  providers: [Globals,InvitationService,FindcompanyService,RegisterService,AuthService,ForgotpasswordService,ResetpassService,ChangepassService,AssessmentDetailsService],


 


  bootstrap: [AppComponent]
})
export class AppModule { }
