import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InvitationService } from '../services/invitation.service';
import { CommonService } from '../services/common.service';

@Component({
	selector: 'app-invitation',
	providers: [InvitationService, CommonService],
	templateUrl: './invitation.component.html',
	styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
	InvitationEntity;
	submitted;
	IndustryList;
	btn_disable;
	header;
	type;
	constructor(private http: Http, private globals: Globals, private router: Router, private InvitationService: InvitationService,
		private route: ActivatedRoute, private CommonService: CommonService) { }


	ngOnInit() {debugger
		if(this.globals.authData.RoleId==4){		
			this.default();
		} else {
			this.CommonService.get_permissiondata({'RoleId':this.globals.authData.RoleId,'screen':'User Invitation'})
			.then((data) => 
			{
				if(data['AddEdit']==1){
					this.default();
				} else {
					this.router.navigate(['/access-denied']);
				}
			},
			(error) => 
			{
				alert('error');
			});	
			
		}
	}

	default(){
		this.globals.msgflag = false;
		this.InvitationEntity = {};
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			//this.header = 'Edit';
			// this.InvitationService.getById(id)
			// .then((data) => 
			// {
			// 	this.InvitationEntity = data;

			// }, 
			// (error) => 
			// {
			// 	alert('error');
			// });	 
		} else {
			this.header = '';
			this.InvitationEntity = {};
			this.InvitationEntity.UserInvitationId = 0;
			this.InvitationEntity.IsActive = '1';
			this.InvitationEntity.IndustryId ='';
			this.InvitationService.getIndustry()
			//.map(res => res.json())
			.then((data) => 
			{
				this.IndustryList = data;
			}, 
			(error) => 
			{
				alert('error');
			});	
		}
	}

	addInvitation(InvitationForm) {
		debugger
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.InvitationEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {
			this.InvitationEntity.CreatedBy = this.globals.authData.UserId;
			this.InvitationEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if (InvitationForm.valid) {
			this.btn_disable = true;
			this.globals.isLoading = true;
			this.InvitationService.add(this.InvitationEntity)
				.then((data) => {
					debugger
					this.globals.isLoading = false;
					if (data == 'email duplicate') {
						this.globals.message = 'You already invited this person!';
						this.globals.type = 'danger';
						this.globals.msgflag = true;
						//this.router.navigate(['/invitation/add']);
					} else {
						//alert('success');
						
						this.btn_disable = false;
						this.submitted = false;
						this.InvitationEntity = {};
						InvitationForm.form.markAsPristine();
						if (id) {
							this.globals.message = 'Data Updated successfully!';
							this.globals.type = 'success';
							this.globals.msgflag = true;
						} else {
							this.globals.message = 'Invitation code has been sent to your email successfully. Please check your email!';
							this.globals.type = 'success';
							this.globals.msgflag = true;
							this.globals.isLoading = false;
						}
						this.router.navigate(['/invitation/list']);
					}

				},
				(error) => {
					alert('error');
					this.btn_disable = false;
					this.submitted = false;
					this.globals.isLoading = false;
				});
		}
	}


	clearForm(InvitationForm) {
		this.InvitationEntity = {};
		this.InvitationEntity.UserInvitationId = 0;
		this.InvitationEntity.IsActive = '1';
		this.submitted = false;
		InvitationForm.form.markAsPristine();
	}
}
