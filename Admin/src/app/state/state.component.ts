import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/Forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { StateService } from '../services/state.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-state',
   providers: [ StateService ],
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
	CountryList;
	stateEntity;
	header;
	btn_disable;
	submitted;
  constructor(private http: Http, private router: Router, private route: ActivatedRoute, private StateService: StateService,private globals: Globals) { }

  ngOnInit() 
  {
	  debugger
	  //this.stateEntity = {};
	  
	 this.StateService.getAllCountry()
	.then((data) => 
	{ 
		this.CountryList = data;	
		
	}, 
	(error) => 
	{
		alert('error');
	});		
		
	  let id = this.route.snapshot.paramMap.get('id');
	 if(id)
	 {
			
			
		// this.header = 'Edit';
		this.StateService.getById(id)
			.then((data) => 
			{
				this.stateEntity=data;
			}, 
			(error) => 
			{
				alert('error');
				//this.btn_disable = false;
				//this.submitted = false;
			});
	 }
	 else
	 {
			 this.stateEntity = {};
	 }
	  
	  
  }

  
   addState(stateForm)
  {		debugger
		let id = this.route.snapshot.paramMap.get('id');
		 if(id){
			 this.submitted = false;
		 } else {
			 this.stateEntity.StateId = 0;
			 this.submitted = true;
		 }
		 if(stateForm.valid)
		 {debugger
			 this.btn_disable = true;
			this.StateService.add(this.stateEntity)
			.then((data) => 
			{
				alert('success');
				this.btn_disable = false;
				this.submitted = false;
				this.stateEntity = {};
				stateForm.form.markAsPristine();
				this.router.navigate(['state/list']);
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});
		} 		
	}
  
	
}
