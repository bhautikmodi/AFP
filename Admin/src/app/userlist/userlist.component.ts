import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/Forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../services/user.service';
import { Globals } from '../globals';
declare var $: any;
@Component({
  selector: 'app-userlist',
   providers: [ UserService ],
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  userList;
deleteEntity;
	msgflag;
	message;
	type;
   constructor(private http: Http, private router: Router, private route: ActivatedRoute, private UserService: UserService,private globals: Globals) { }

  ngOnInit()
  {
	 debugger
	this.UserService.getAllUser()
	//.map(res => res.json())
	.then((data) => 
	{
		this.userList = data;
			setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ User per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ User",
					"sInfoFiltered": "(filtered from _MAX_ total User)"
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
  
  deleteUser(user)
	{ 
		this.deleteEntity =  user;
		$('#Delete_Modal').modal('show');					
	}
  
  deleteConfirm(user)
	{ 
		this.UserService.deleteUser(user.UserId)
		.then((data) => 
		{
			let index = this.userList.indexOf(user);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.userList.splice(index, 1);
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
