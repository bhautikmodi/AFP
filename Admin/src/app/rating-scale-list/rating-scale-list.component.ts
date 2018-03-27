import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RatingScaleService } from '../services/rating-scale.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-rating-scale-list',
  providers: [ RatingScaleService ],
  templateUrl: './rating-scale-list.component.html',
  styleUrls: ['./rating-scale-list.component.css']
})
export class RatingScaleListComponent implements OnInit {

	ratingList;
	deleteEntity;
	msgflag;
	message;
	type;
	
	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		 private RatingScaleService: RatingScaleService, private globals: Globals) 
  {
	
  }

  ngOnInit() { 
	this.RatingScaleService.getAll()
	.then((data) => 
	{ 
		this.ratingList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Rating Scale per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Rating Scale",
					"sInfoFiltered": "(filtered from _MAX_ total Rating Scale)",
					"sInfoEmpty": "Showing 0 to 0 of 0 Rating Scale"
        }
      });
    },100); 

	}, 
	(error) => 
	{
		alert('error');
	});	
	this.msgflag = false;
  }
	
	deleteRatingScale(ratingscale)
	{ 
		this.deleteEntity =  ratingscale;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(ratingscale)
	{ 
		this.RatingScaleService.delete(ratingscale.RatingScaleId)
		.then((data) => 
		{
			let index = this.ratingList.indexOf(ratingscale);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.ratingList.splice(index, 1);			
			}	
			this.globals.message = 'Delete successfully';
			this.globals.type = 'success';
			this.globals.msgflag = true;
		}, 
		(error) => 
		{
			$('#Delete_Modal').modal('hide');
			if(error.text){
				this.globals.message = "You can't delete this record because of their dependency.";
				this.globals.type = 'danger';
				this.globals.msgflag = true;
			}	
		});		
	}
	
}


