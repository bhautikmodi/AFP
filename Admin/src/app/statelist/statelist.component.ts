import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../services/state.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-statelist',
  providers: [ StateService ],
  templateUrl: './statelist.component.html',
  styleUrls: ['./statelist.component.css']
})
export class StatelistComponent implements OnInit {
	stateList;
	deleteEntity;
	msgflag;
	message;
   constructor(private http: Http, private router: Router, private route: ActivatedRoute, private StateService: StateService, private globals: Globals) { }

 ngOnInit()
  {
	 
	this.StateService.getAll()
	//.map(res => res.json())
	.then((data) => 
	{
		this.stateList = data;
				setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ State per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ State",
					"sInfoFiltered": "(filtered from _MAX_ total State)"
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
  
  deleteState(state)
	{ 
		this.deleteEntity =  state;
		$('#Delete_Modal').modal('show');					
	}
  
  deleteConfirm(state)
	{
		this.StateService.deleteState(state.StateId)
		.then((data) => 
		{
			let index = this.stateList.indexOf(state);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.stateList.splice(index, 1);
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
