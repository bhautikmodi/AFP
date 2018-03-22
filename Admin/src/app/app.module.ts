import { BrowserModule } from '@angular/platform-browser';

import { Component,NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/Forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
	HttpModule,
	FormsModule,
	RouterModule.forRoot([		
		{
			path : '',
			component : AppComponent
		},
		{
			path : '**',
			redirectTo : 'home'
		}
	])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
