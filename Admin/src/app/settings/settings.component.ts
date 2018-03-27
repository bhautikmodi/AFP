import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-settings',
  providers: [ SettingsService ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  teamsizeEntity;
	submitted;
	btn_disable;
  header;
  teamsizeList;
  deleteEntity;

  constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute, private SettingsService: SettingsService, private globals: Globals)
    {
		
	 }

  ngOnInit() {
   this.header = 'Add';
   this.SettingsService.getAll()
	.then((data) => 
	{ 
		this.teamsizeList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ teamsize per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ teamsize",
					"sInfoFiltered": "(filtered from _MAX_ total teamsize)",
					"sInfoEmpty": "Showing 0 to 0 of 0 teamsize"
        }
      });
    },100); 

	}, 
	(error) => 
	{
		alert('error');
	});	
  }


  addTeamSize(teamsizeForm)
	{		
		let id = this.route.snapshot.paramMap.get('id');
		if(id){			
			this.teamsizeEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {			
			this.teamsizeEntity.CreatedBy = this.globals.authData.UserId;
			this.teamsizeEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if(teamsizeForm.valid){
			this.btn_disable = true;
			this.SettingsService.add(this.teamsizeEntity)
			.then((data) => 
			{
				//alert('success');
				this.btn_disable = false;
				this.submitted = false;
				this.teamsizeEntity = {};
				teamsizeForm.form.markAsPristine();
				if(id){
					this.globals.message = 'Update successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				} else {
					this.globals.message = 'Add successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				}		
				//this.router.navigate(['/rating-scale/list']);
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});
		} 		
	}
	
  deleteteamsize(teamsize)
	{ 
		this.deleteEntity =  teamsize;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(teamsize)
	{ 
		this.SettingsService.delete(teamsize.TeamSizeId)
		.then((data) => 
		{
			let index = this.teamsizeList.indexOf(teamsize);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.teamsizeList.splice(index, 1);				
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
