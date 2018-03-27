import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company',
   providers: [CompanyService],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {
	IndustryList;
    companyEntity;
	submitted;
	btn_disable;
	header;
   constructor( private http: Http,private globals: Globals, private router: Router,private route:ActivatedRoute,private CompanyService:CompanyService ) { }
   
  ngOnInit() 
  {
	   this.CompanyService.getAllIndustry()
	//.map(res => res.json())
	.then((data) => 
	{
		this.IndustryList = data;
	}, 
	(error) => 
	{
		alert('error');
	});	
	  
	  let id = this.route.snapshot.paramMap.get('id');
	 if(id)
	 {	
		 this.header = 'Edit';
		this.CompanyService.getById(id)
			.then((data) => 
			{
				this.companyEntity=data;
				
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});
	 }
	 else
	 {
			 this.companyEntity = {};
			  this.companyEntity.IsActive = '1';
	 }
  } 
  
  addCompany(companyForm)
  {		debugger
		let id = this.route.snapshot.paramMap.get('id');
		if(id){
			this.submitted = false;
		} else {
			this.companyEntity.CompanyId = 0;
			this.submitted = true;
		}
		if(companyForm.valid){
			this.btn_disable = true;
			this.CompanyService.add(this.companyEntity)
			.then((data) => 
			{
				//alert('success');
				//this.aa=true;
				this.btn_disable = false;
				this.submitted = false;
				this.companyEntity = {};
				companyForm.form.markAsPristine();
				if(id){
					this.globals.message = 'Update successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				} else {
					this.globals.message = 'Add successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				}	
				
				this.router.navigate(['company/list']);
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
