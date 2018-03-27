import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CourcelevelService } from '../services/courcelevel.service';
import { Globals } from '.././globals';
declare var $: any;
@Component({
  selector: 'app-courcelevellist',
    providers: [ CourcelevelService ],
  templateUrl: './courcelevellist.component.html',
  styleUrls: ['./courcelevellist.component.css']
})
export class CourcelevellistComponent implements OnInit 
{
CourselevelList;
deleteEntity;
	msgflag;
	message;
constructor(private http: Http, private router: Router, private route: ActivatedRoute, private CourcelevelService: CourcelevelService, private globals: Globals) 
  {
	
  }

 ngOnInit() { 
	this.CourcelevelService.getAll()
	.then((data) => 
	{ 
		this.CourselevelList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Course Level per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Course Level",
					"sInfoFiltered": "(filtered from _MAX_ total Course Level)"
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
	
	deleteCourselevel(Courselevel)
	{ 
		this.deleteEntity =  Courselevel;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(Courselevel)
	{ 
		this.CourcelevelService.delete(Courselevel.ConfigurationId)
		.then((data) => 
		{
			let index = this.CourselevelList.indexOf(Courselevel);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.CourselevelList.splice(index, 1);
				//this.router.navigate(['/domain/list']);
				// setTimeout(function(){
				// 	$('#dataTables-example').dataTable( {
				// 		"oLanguage": {
				// 			"sLengthMenu": "_MENU_ Domains per Page",
				// 			"sInfo": "Showing _START_ to _END_ of _TOTAL_ Domains",
				// 			"sInfoFiltered": "(filtered from _MAX_ total Domains)"
				// 		}
				// 	});
				// },3000); 
			}			
			//alert(data);
			this.message = 'Delete successfully';
			this.msgflag = true;
		}, 
		(error) => 
		{
			alert('error');
		});		
	}
}
