import { BrowserModule } from '@angular/platform-browser';
import { Globals } from './globals';
import { Component,NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/Forms';
import { HttpModule } from '@angular/http';


import { AuthGuard } from './services/auth-guard.service';
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
import { DashbordService } from './services/dashbord.service';

import { HomeService } from './services/home.service';
import { AssessmentDetailsComponent } from './assessment-details/assessment-details.component';
import { AssessmentDetailsService } from './services/assessment-details.service';
<<<<<<< HEAD
import { AssessmentComponent } from './assessment/assessment.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
=======
import { HomeComponent } from './home/home.component';
>>>>>>> 5cf236d11570d71a155849e6e90db43b7056f05f



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

    AssessmentDetailsComponent,

<<<<<<< HEAD
    AssessmentComponent,

    ThankyouComponent
=======
    HomeComponent
>>>>>>> 5cf236d11570d71a155849e6e90db43b7056f05f


  ],
  imports: [
    BrowserModule,
	HttpModule,
	FormsModule,
	RouterModule.forRoot([		
		{
			path : '',
			component : HomeComponent,
			
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
			canActivate : [AuthGuard]
		},
		{
			path : 'changepass',
			component : ChangepassComponent,
			canActivate : [AuthGuard]
		},
		{
			//path : 'resetpass',
			path : 'resetpass/:id',
			component : ResetpassComponent,
			//canActivate : [AuthGuard]
		},
		
		{
			path : 'forgotpassword',
			component : ForgotpasswordComponent,
			//canActivate : [AuthGuard]
<<<<<<< HEAD

=======
>>>>>>> 5cf236d11570d71a155849e6e90db43b7056f05f
		},
		{
			path : 'assessment_details',
			component : AssessmentDetailsComponent,
			canActivate : [AuthGuard]
		},
		{
			path : 'assessment',
			component : AssessmentComponent

		},
		{
			path : 'thankyou',
			component : ThankyouComponent

		},
		{
			path : '**',
			redirectTo : 'HomeComponent',
			canActivate : [AuthGuard]
		},
		{
			path : 'login',
			component : LoginComponent,
			canActivate : [AuthGuard]
		}
	])
  ],

<<<<<<< HEAD

  providers: [Globals,InvitationService,FindcompanyService,RegisterService,AuthService,AuthGuard,ForgotpasswordService,ResetpassService,ChangepassService,AssessmentDetailsService,DashbordService],

  



 
=======
  providers: [Globals,InvitationService,FindcompanyService,RegisterService,AuthService,AuthGuard,ForgotpasswordService,ResetpassService,ChangepassService,AssessmentDetailsService,DashbordService,HomeService],
>>>>>>> 31098b3c7e398a96be60c1b14e18ba768fff4fc9


  bootstrap: [AppComponent]
})
export class AppModule { }
