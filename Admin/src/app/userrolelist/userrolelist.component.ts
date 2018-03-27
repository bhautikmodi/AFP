import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserroleService } from '../services/userrole.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-userrolelist',
  providers: [ UserroleService ],
  templateUrl: './userrolelist.component.html',
  styleUrls: ['./userrolelist.component.css']
})
export class UserrolelistComponent implements OnInit {

  userroleList;
  deleteEntity;
  msgflag;
	message;
   constructor(private http: Http, private router: Router, private route: ActivatedRoute, private UserroleService: UserroleService, private globals: Globals) { }

  
  ngOnInit()
  {
	 
	this.UserroleService.getAll()
	//.map(res => res.json())
	.then((data) => 
	{
		this.userroleList = data;
				setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Userrole per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Userrole",
					"sInfoFiltered": "(filtered from _MAX_ total Userrole)"
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
  
  deleteUserrole(userrole)
	{ 
		this.deleteEntity =  userrole;
		$('#Delete_Modal').modal('show');					
	}
  
  deleteConfirm(userrole)
	{ 
		this.UserroleService.deleteUserrole(userrole.RoleId)
		.then((data) => 
		{
			let index = this.userroleList.indexOf(userrole);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.userroleList.splice(index, 1);
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
