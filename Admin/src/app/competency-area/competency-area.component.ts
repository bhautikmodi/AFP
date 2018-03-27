import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CompetencyAreaService } from '../services/competency-area.service';
import { Globals } from '.././globals';
declare var $: any;
declare var nicEditors,nicEditor: any;

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
	new nicEditor({fullPanel: true, maxHeight: 200}).panelInstance('Description');
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
			nicEditors.findEditor('Description').setContent(this.areaEntity.Description);
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
		nicEditors.findEditor('Description').setContent('');	
	}
	
	// $(".nicEdit-main").keyup(function () { 
	// 	let Description = nicEditors.findEditor('Description').getContent();
	// 	//alert(Description);
	// 	if(Description!=""){
	// 		this.des_valid = false;
	// 	} else {
	// 		this.des_valid = true;
	// 	}
	// 	alert(this.des_valid);
    // });	
  } 

	
	addArea(areaForm)
	{	
		this.areaEntity.Description = nicEditors.findEditor('Description').getContent();	
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
			//this.areaEntity.Description = nicEditors.findEditor('Description').getContent();
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
		areaForm.form.markAsPristine();
		nicEditors.findEditor('Description').setContent('');
	}	

	

}
