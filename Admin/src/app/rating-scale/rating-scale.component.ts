import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RatingScaleService } from '../services/rating-scale.service';
import { Globals } from '.././globals';

@Component({
  selector: 'app-rating-scale',
  providers: [ RatingScaleService ],
  templateUrl: './rating-scale.component.html',
  styleUrls: ['./rating-scale.component.css']
})

export class RatingScaleComponent implements OnInit 
{	
	ratingscaleEntity;
	submitted;
	btn_disable;
	header;
	
  constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute, private RatingScaleService: RatingScaleService, private globals: Globals)
    {
		
	}
  ngOnInit() 
  {
	this.ratingscaleEntity = {};
	let id = this.route.snapshot.paramMap.get('id');
	this.globals.msgflag = false;
	if(id){
		this.header = 'Edit';
		this.RatingScaleService.getById(id)
		.then((data) => 
		{
			this.ratingscaleEntity = data;
		}, 
		(error) => 
		{
			alert('error');
		});	 
	} else {
		this.header = 'Add';
		this.ratingscaleEntity = {};
		this.ratingscaleEntity.RatingScaleId = 0;
    this.ratingscaleEntity.IsActive = '1';
	}
    
  } 

	
	addRatingScale(ratingscaleForm)
	{		
		let id = this.route.snapshot.paramMap.get('id');
		if(id){			
			this.ratingscaleEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {			
			this.ratingscaleEntity.CreatedBy = this.globals.authData.UserId;
			this.ratingscaleEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if(ratingscaleForm.valid){
			this.btn_disable = true;
			this.RatingScaleService.add(this.ratingscaleEntity)
			.then((data) => 
			{
				//alert('success');
				this.btn_disable = false;
				this.submitted = false;
				this.ratingscaleEntity = {};
				ratingscaleForm.form.markAsPristine();
				if(id){
					this.globals.message = 'Update successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				} else {
					this.globals.message = 'Add successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				}		
				this.router.navigate(['/rating-scale/list']);
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});
		} 		
	}
	
	clearForm(ratingscaleForm)
	{
		this.ratingscaleEntity = {};	
		this.ratingscaleEntity.RatingScaleId = 0;
    this.ratingscaleEntity.IsActive = '1';	
		this.submitted = false;
		ratingscaleForm.form.markAsPristine();
	}	
	
}


