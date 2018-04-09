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
	IndustryList;
	stateList;
	submitted;
	btn_disable;
	header;
	type;
	same;
	companydata;
	RegisterFormfinal;
  constructor( private http: Http,private globals: Globals, private router: Router, private RegisterService: RegisterService,private route:ActivatedRoute) { }


  ngOnInit() {debugger
	  
	  
	  this.btn_disable = false;
	  this.RegisterEntity={};
	   this.companydata={};
	   
    // $('select').select2();

// $('#employee_btn').click(function () {
	// $("#submit_Modal").modal('show');
// });
 	this.RegisterEntity.EmailAddress= localStorage.getItem('EmailAddress');
 this.RegisterService.getIndustry()
	//.map(res => res.json())
	.then((data) => 
	{
		this.IndustryList = data;
	}, 
	(error) => 
	{
		alert('error');
	});	
	let token = localStorage.getItem('CompanyId');
	this.RegisterService.getAllCountry(token)
	.then((data) => 
	{ 
		this.CountryList = data['res'];
		this.companydata = data['com'];	
		
	}, 
	(error) => 
	{
		alert('error');
	});
	
	

  }
  addRegister(RegisterForm)
	{		
					
			// this.RegisterEntity.CreatedBy = this.globals.authData.UserId;
			// this.RegisterEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		
			
		
		if(RegisterForm.valid){
			
			this.RegisterFormfinal = RegisterForm;
			$("#submit_Modal").modal('show');
			
			
			// this.btn_disable = true;
			// var data = {'com': this.companydata,'reg':this.RegisterEntity};
			// this.RegisterService.add(data)
			
			// .then((data) => 
			// {
				// //alert('success');
				// this.btn_disable = false;
				// this.submitted = false;
				// this.RegisterEntity = {};
				// RegisterForm.form.markAsPristine();
					// this.globals.message = 'Add successfully';
					// this.globals.type = 'success';
					// this.globals.msgflag = true;
							
				// this.router.navigate(['/welcome_register']);
			// }, 
			// (error) => 
			// {
				// alert('error');
				// this.btn_disable = false;
				// this.submitted = false;
			// });
		} 		
	}
	
	finalsubmit(RegisterForm){
		this.btn_disable = true;
		var data = {'com': this.companydata,'reg':this.RegisterEntity};
			this.RegisterService.add(data)
			
			.then((data) => 
			{
				//alert('success');
				this.btn_disable = false;
				this.submitted = false;
				this.RegisterEntity = {};
				RegisterForm.form.markAsPristine();
					this.globals.message = 'Add successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
							
				this.router.navigate(['/welcome_register']);
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});
		
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
	checkpassword(){ 
		if(this.RegisterEntity.cPassword != this.RegisterEntity.Password){
			this.same = true;
		} else {
			this.same = false;
		}
		
	}
	

}
