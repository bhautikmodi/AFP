import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { InvitationService } from '../services/invitation.service';
declare var $: any;
@Component({
  selector: 'app-invitation',
   providers: [ InvitationService ],
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {

constructor( private http: Http,private globals: Globals, private router: Router, private InvitationService: InvitationService,private route:ActivatedRoute) { }
 InvitationEntity;
	submitted;
	btn_disable;
	header;
	type;
	

  ngOnInit() 
  {
  $('.invitation_text .form-control').keyup(function(e){
	if($(this).val().length==$(this).attr('maxlength'))
	$(this).next('.form-control').focus()
})
  this.globals.msgflag=false;
	  this.InvitationEntity = {};
	    this.InvitationEntity = {};
	let id = this.route.snapshot.paramMap.get('id');
	if(id){
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
	}

  }
  
  
  
  addInvitation(InvitationForm)
	{		debugger
	
		
			this.submitted = true;
		
		if(InvitationForm.valid){
			this.InvitationEntity.Code=this.InvitationEntity.code1+this.InvitationEntity.code2+this.InvitationEntity.code3+this.InvitationEntity.code4
			+this.InvitationEntity.code5+this.InvitationEntity.code6;
		
			this.btn_disable = true;
			 this.globals.isLoading = true;
			this.InvitationService.add(this.InvitationEntity)
			.then((data) => 
			{debugger 
				this.globals.isLoading = false;
				if(data=='Code success')
				{

					this.btn_disable = false;
					this.submitted = false;
						  localStorage.setItem('EmailAddress',this.InvitationEntity.EmailAddress);
					this.InvitationEntity = {};
					InvitationForm.form.markAsPristine();
						this.globals.message = 'Code successfully';
						this.globals.type = 'success';
						this.globals.msgflag = true;
						
						this.router.navigate(['/register']);
					
				}else if(data=='days')
				{
					this.globals.message = 'Your invitation code has expired.';
						this.globals.type = 'danger';
						this.globals.msgflag = true;
						this.btn_disable = false;
					this.submitted = false;

				}else if(data=='revoked')
				{
					this.globals.message = 'Your access has been revoked.';
						this.globals.type = 'danger';
						this.globals.msgflag = true;
						this.btn_disable = false;
					this.submitted = false;

				}
				else if(data=='email')
				{
					this.globals.message = 'Please enter valid email address.';
						this.globals.type = 'danger';
						this.globals.msgflag = true;
						this.btn_disable = false;
					this.submitted = false;

				}
				else if(data=='code')
				{
					this.globals.message = 'Please enter valid invitation code.';
					this.globals.type = 'danger';
					this.globals.msgflag = true;
					this.btn_disable = false;
				this.submitted = false;
				//this.router.navigate(['/register']);
				
					
				}
				
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});
		} 		
	}

}
