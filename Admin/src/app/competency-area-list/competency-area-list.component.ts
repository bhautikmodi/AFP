import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CompetencyAreaService } from '../services/competency-area.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-competency-area-list',
  providers: [ CompetencyAreaService ],
  templateUrl: './competency-area-list.component.html',
  styleUrls: ['./competency-area-list.component.css']
})
export class CompetencyAreaListComponent implements OnInit {

	areaList;
	deleteEntity;
	msgflag;
	message;
	
	constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute,
		 private CompetencyAreaService: CompetencyAreaService, private globals: Globals) 
  {
	
  }

  ngOnInit() { 
	this.CompetencyAreaService.getAll()
	.then((data) => 
	{ 
		this.areaList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ areas per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ areas",
					"sInfoFiltered": "(filtered from _MAX_ total areas)"
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
	
	deletearea(area)
	{ 
		this.deleteEntity =  area;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(area)
	{ 
		this.CompetencyAreaService.delete(area.CAreaId)
		.then((data) => 
		{
			let index = this.areaList.indexOf(area);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.areaList.splice(index, 1);			
			}	
			this.message = 'Delete successfully';
			this.msgflag = true;
		}, 
		(error) => 
		{
			alert('error');
		});		
	}
	
}


