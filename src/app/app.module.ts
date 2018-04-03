import { BrowserModule } from '@angular/platform-browser';
import { Globals } from './globals';
import { Component,NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/Forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { InvitationComponent } from './invitation/invitation.component';
import { InvitationService } from './services/invitation.service';
import { FindcompanyComponent } from './findcompany/findcompany.component';
import { FindcompanyService } from './services/findcompany.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashbordComponent,
    FooterComponent,
    ContactusComponent,
    InvitationComponent,
    FindcompanyComponent
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
			component : FindcompanyComponent
		},
		{
			path : '**',
			redirectTo : 'DashbordComponent'
		}
	])
  ],
  providers: [Globals,InvitationService,FindcompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
