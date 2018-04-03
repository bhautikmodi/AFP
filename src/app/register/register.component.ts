import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../services/register.service';
declare var $: any;

@Component({
  selector: 'app-register',
   providers: [ RegisterService ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
RegisterEntity;
CountryList;
submitted;
stateList;
	btn_disable;
	header;
	type;
  constructor( private http: Http,private globals: Globals, private router: Router, private RegisterService: RegisterService,private route:ActivatedRoute) { }


  ngOnInit() {
	  this.RegisterEntity={};
    //$('select').select2();
	this.RegisterService.getAllCountry()
	.then((data) => 
	{ 
		this.CountryList = data;
		
		
	}, 
	(error) => 
	{
		alert('error');
	});	
	 // this.RegisterService.getAllState()
	// .then((data) => 
	// {
		// this.stateList = data;
	// }, 
	// (error) => 
	// {
		// alert('error');
	// });	
	

	
	
	
	
	
  }
  addRegister(RegisterForm)
	{		
		let id = this.route.snapshot.paramMap.get('id');
		if(id){			
			this.RegisterEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {			
			this.RegisterEntity.CreatedBy = this.globals.authData.UserId;
			this.RegisterEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if(RegisterForm.valid){
			this.btn_disable = true;
			this.RegisterService.add(this.RegisterEntity)
			.then((data) => 
			{
				//alert('success');
				this.btn_disable = false;
				this.submitted = false;
				this.RegisterEntity = {};
				RegisterForm.form.markAsPristine();
				if(id){
					this.globals.message = 'Update successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				} else {
					this.globals.message = 'Add successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				}			
				this.router.navigate(['/register']);
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});
		} 		
	}
	getStateList()
	{ debugger
		if(this.RegisterEntity.CountryId > 0){
			this.RegisterService.getStateList(this.RegisterEntity.CountryId)
			.then((data) => 
			{
				this.stateList = data;
			}, 
			(error) => 
			{
				alert('error');
			});
		} else {
			this.stateList = [];
		}
	}

}
