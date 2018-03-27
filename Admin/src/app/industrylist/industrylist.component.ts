import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IndustryService } from '../services/industry.service';
import { Globals } from '.././globals';

declare var $: any;

@Component({
  selector: 'app-industrylist',
  providers: [ IndustryService ],
  templateUrl: './industrylist.component.html',
  styleUrls: ['./industrylist.component.css']
})
export class IndustrylistComponent implements OnInit {
	IndustryList;
	deleteEntity;
	msgflag;
	message;
	type;
 constructor( private http: Http,private globals: Globals, private router: Router, private IndustryService: IndustryService,private route:ActivatedRoute) { }

  ngOnInit() { debugger
  
	this.IndustryService.getAll()
	.then((data) => 
	{ 
		this.IndustryList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Industry per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Industry",
					"sInfoFiltered": "(filtered from _MAX_ total Industry)"
        }
      });
    },100); 

	}, 
	(error) => 
	{
		alert('error');
	});	
	//this.msgflag = false;
  }

	deleteIndustry(Industry)
	{ 
		this.deleteEntity =  Industry;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(Industry)
	{ 
		this.IndustryService.delete(Industry.CourseId)
		.then((data) => 
		{
			let index = this.IndustryList.indexOf(Industry);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.IndustryList.splice(index, 1);
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
