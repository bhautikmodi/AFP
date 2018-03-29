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
	submitted1;
	btn_disable1;
	submitted2;
	btn_disable2;
	submitted3;
	btn_disable3;
	submitted4;
	btn_disable4;
  	header;
  	teamsizeList;
	deleteEntity;
	configEntity;
	updateEntity;
	cmsgflag;
	cmessage;
	reminderDaysList;

  constructor(private el: ElementRef, private http: Http, private router: Router, private route: ActivatedRoute, private SettingsService: SettingsService, private globals: Globals)
    {
		
	 }

  ngOnInit() {

	var item = { 'Day': '', 'CreatedBy': this.globals.authData.UserId, 'UpdatedBy':this.globals.authData.UserId};
    this.reminderDaysList = [];
    this.reminderDaysList.push(item);
	this.submitted3 = false;
	 this.header = 'Add';
	 this.teamsizeEntity = {};
	 this.teamsizeEntity.TeamSizeId = 0;
	 this.configEntity = {};
	 this.cmsgflag = false;
   this.SettingsService.getAll(this.globals.authData.UserId)
	.then((data) => 
	{ 
		this.teamsizeList = data['teamsize'];	
		this.configEntity.noofksa = data['noofksa']['Value'];	
		this.configEntity.invitation = data['invitation']['Value'];	
		this.reminderDaysList = data['remainingdays'];	
		this.configEntity.emailfrom = data['emailfrom']['Value'];	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Teamsize per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Teamsize",
					"sInfoFiltered": "(filtered from _MAX_ total Teamsize)",
					"sInfoEmpty": "Showing 0 to 0 of 0 Teamsize"
        }
      });
    },100); 

	}, 
	(error) => 
	{
		alert('error');
	});	
  }

  AddNewRDays(index){ debugger
	var item = { 'Day': '', 'CreatedBy': this.globals.authData.UserId, 'UpdatedBy':this.globals.authData.UserId};
	if (this.reminderDaysList.length <= index + 1) {
		this.reminderDaysList.splice(index + 1, 0, item);
	}
  }

  DeleteRDays(item){ debugger
	var index = this.reminderDaysList.indexOf(item);	
	this.reminderDaysList.splice(index, 1);		
  }

	getTeamSizeList(){	
		this.SettingsService.getTeamSizeList()
		.then((data) => 
		{ 
			this.teamsizeList = data;	
		}, 
		(error) => 
		{
			alert('error');
		});	
	}


  addTeamSize(teamsizeForm)
	{	
		if(this.teamsizeEntity.TeamSizeId>0){			
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
				this.header = 'Add';
				if(this.teamsizeEntity.TeamSizeId>0){
					this.globals.message = 'Update successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				} else {
					//this.teamsizeList.push(data);
					this.globals.message = 'Add successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				}
	 			this.teamsizeEntity = {};
	 			this.teamsizeEntity.TeamSizeId = 0;
				teamsizeForm.form.markAsPristine();				
				this.getTeamSizeList();	
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});
		} 		
	}

	editteamsize(teamsize){
		this.header = 'Edit';
		this.submitted = false;
		this.teamsizeEntity = teamsize;
	}

	cancleForm(teamsizeForm){
	 this.header = 'Add';
	 this.teamsizeEntity = {};
	 this.teamsizeEntity.TeamSizeId = 0;
	 this.submitted = false;
	 teamsizeForm.form.markAsPristine();
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

	addNoOfKSA(ksaForm)
	{		
		this.updateEntity = {};
		this.updateEntity.Key = 'NoOfKSA';
		this.updateEntity.Value = this.configEntity.noofksa;
		this.updateEntity.UpdatedBy = this.globals.authData.UserId;
		this.submitted1 = true;
		if(ksaForm.valid){
			this.btn_disable1 = true;
			this.SettingsService.update_config(this.updateEntity)
			.then((data) => 
			{		
				this.btn_disable1 = false;
				this.submitted1 = false;
	 			this.updateEntity = {};
				 ksaForm.form.markAsPristine();				 
				 this.cmsgflag = true;
				 this.cmessage = 'No of KSA update successfully';
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable1 = false;
				this.submitted1 = false;
			});
		} 		
	}

	addinvitation(invitationForm)
	{		
		this.updateEntity = {};
		this.updateEntity.Key = 'Invitation';
		this.updateEntity.Value = this.configEntity.invitation;
		this.updateEntity.UpdatedBy = this.globals.authData.UserId;
		this.submitted2 = true;
		if(invitationForm.valid){
			this.btn_disable2 = true;
			this.SettingsService.update_config(this.updateEntity)
			.then((data) => 
			{		
				this.btn_disable2 = false;
				this.submitted2 = false;
	 			this.updateEntity = {};
				 invitationForm.form.markAsPristine();
				 this.cmsgflag = true;
				 this.cmessage = 'Invitation Features update successfully';
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable2 = false;
				this.submitted2 = false;
			});
		} 		
	}

	addRDays(rdaysForm)
	{		debugger
		this.submitted3 = true;
		if(rdaysForm.valid){
			this.btn_disable3 = true;
			this.SettingsService.addRemainigDays(this.reminderDaysList)
			.then((data) =>
			{
				this.btn_disable3 = false;
				this.submitted3 = false;
				this.cmsgflag = true;
				this.cmessage = 'Remaining Days update successfully';
			},
			(error) =>
			{
				alert('error');
				this.btn_disable3 = false;
				this.submitted3 = false;
			});
		}
		// this.updateEntity = {};
		// this.updateEntity.Key = 'RemainingDays';
		// this.updateEntity.Value = this.configEntity.remainingdays;
		// this.updateEntity.UpdatedBy = this.globals.authData.UserId;
		// this.submitted3 = true;
		// if(rdaysForm.valid){
		// 	this.btn_disable3 = true;
		// 	this.SettingsService.update_config(this.updateEntity)
		// 	.then((data) => 
		// 	{		
		// 		this.btn_disable3 = false;
		// 		this.submitted3 = false;
	 	// 		this.updateEntity = {};
		// 		 rdaysForm.form.markAsPristine();
		// 		 this.cmsgflag = true;
		// 		 this.cmessage = 'Remaining Days update successfully';
		// 	}, 
		// 	(error) => 
		// 	{
		// 		alert('error');
		// 		this.btn_disable3 = false;
		// 		this.submitted3 = false;
		// 	});
		// } 		
	}

	addEmailFrom(fromForm)
	{		
		this.updateEntity = {};
		this.updateEntity.Key = 'EmailFrom';
		this.updateEntity.Value = this.configEntity.emailfrom;
		this.updateEntity.UpdatedBy = this.globals.authData.UserId;
		this.submitted4 = true;
		if(fromForm.valid){
			this.btn_disable4 = true;
			this.SettingsService.update_config(this.updateEntity)
			.then((data) => 
			{		
				this.btn_disable4 = false;
				this.submitted4 = false;
	 			this.updateEntity = {};
				 fromForm.form.markAsPristine();
				 this.cmsgflag = true;
				 this.cmessage = 'Email From update successfully';
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable4 = false;
				this.submitted4 = false;
			});
		} 		
	}


}
