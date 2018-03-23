import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CompetencyAreaService } from '../services/competency-area.service';
import { Globals } from '.././globals';

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
	
  constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute, private CompetencyAreaService: CompetencyAreaService, private globals: Globals)
    {
		
	}
  ngOnInit() 
  {
	this.areaEntity = {};
	let id = this.route.snapshot.paramMap.get('id');
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
	}
    
  } 

	
	addArea(areaForm)
	{		
		let id = this.route.snapshot.paramMap.get('id');
		if(id){			
			this.areaEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {			
			this.areaEntity.CreatedBy = this.globals.authData.UserId;
			this.areaEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if(areaForm.valid){
			this.btn_disable = true;
			this.CompetencyAreaService.add(this.areaEntity)
			.then((data) => 
			{
				alert('success');
				this.btn_disable = false;
				this.submitted = false;
				this.areaEntity = {};
				areaForm.form.markAsPristine();
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
		this.submitted = false;
		areaForm.form.markAsPristine();
	}	
	
}
