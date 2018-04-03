import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CourselevelService } from '../services/courselevel.service';
import { Globals } from '.././globals';
declare var $: any;
@Component({
  selector: 'app-courselevellist',
      providers: [ CourselevelService ],
  templateUrl: './courselevellist.component.html',
  styleUrls: ['./courselevellist.component.css']
})
export class CourselevellistComponent implements OnInit {
	CourselevelList;
	deleteEntity;
	msgflag;
	message;
	type;
 constructor(private http: Http, private router: Router, private route: ActivatedRoute, private CourselevelService: CourselevelService, private globals: Globals) 
  {
	
  }

 ngOnInit() { 
	this.CourselevelService.getAll()
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
	
  }
	
	deleteCourselevel(Courselevel)
	{ 
		this.deleteEntity =  Courselevel;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(Courselevel)
	{ 
		this.CourselevelService.delete(Courselevel.ConfigurationId)
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