import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CompetencyAreaService } from '../services/competency-area.service';
import { Globals } from '.././globals';
declare var $: any;
declare var CKEDITOR: any;

@Component({
  selector: 'app-competency-area',
  providers: [ CompetencyAreaService ],
  templateUrl: './competency-area.component.html',
  styleUrls: ['./competency-area.component.css']
})

export class CompetencyAreaComponent implements OnInit 
{	
	areaEntity;
	domainList;
	submitted;
	btn_disable;
	header;
	des_valid;
	
  constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute, private CompetencyAreaService: CompetencyAreaService, private globals: Globals)
    {
		
	}
  ngOnInit() 
  {
	this.des_valid = false;
	CKEDITOR.replace( 'Description' );
	this.areaEntity = {};
	let id = this.route.snapshot.paramMap.get('id');
	this.globals.msgflag = false;
	this.CompetencyAreaService.getDomainList()
	.then((data) => 
	{
		this.domainList = data;
	}, 
	(error) => 
	{
		alert('error');
	});	 
	if(id){
		this.header = 'Edit';
		this.CompetencyAreaService.getById(id)
		.then((data) => 
		{ 
			this.areaEntity = data;
			CKEDITOR.instances.Description.setData(this.areaEntity.Description);	
		}, 
		(error) => 
		{
			alert('error');
		});	 
	} else {
		this.header = 'Add';
    	this.areaEntity = {};
    	this.areaEntity.CAreaId = 0;
		this.areaEntity.IsActive = '1';
		this.areaEntity.DomainId = '';	
	}
	
	// CKEDITOR.instances.Description.on('change', function() { 		
	// 	var desc = CKEDITOR.instances.Description.getData();
	// 	alert(desc);
	// 	if(desc!=""){
	// 		this.des_valid = false;
	// 	} else {
	// 		this.des_valid = true;
	// 	}
	// });

  } 

	
	addArea(areaForm)
	{	debugger
		this.areaEntity.Description = CKEDITOR.instances.Description.getData();	
		if(this.areaEntity.Description!=""){
			this.des_valid = false;
		} else {
			this.des_valid = true;
		}
		let id = this.route.snapshot.paramMap.get('id');
		if(id){			
			this.areaEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {			
			this.areaEntity.CreatedBy = this.globals.authData.UserId;
			this.areaEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if(areaForm.valid && this.des_valid==false){
			this.btn_disable = true;
			this.CompetencyAreaService.add(this.areaEntity)
			.then((data) => 
			{
				//alert('success');
				this.btn_disable = false;
				this.submitted = false;
				this.areaEntity = {};
				areaForm.form.markAsPristine();
				if(id){
					this.globals.message = 'Update successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				} else {
					this.globals.message = 'Add successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				}		
				this.router.navigate(['/competency-area/list']);
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});
		} 		
	}
	
	clearForm(areaForm)
	{		
    	this.areaEntity = {};	
		this.areaEntity.CAreaId = 0;
    	this.areaEntity.IsActive = '1';		
		this.areaEntity.DomainId = '';
		this.submitted = false;
		this.des_valid = false;
		CKEDITOR.instances.Description.setData('');	
		areaForm.form.markAsPristine();
	}	

	

}
