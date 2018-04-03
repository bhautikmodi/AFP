import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { EmailtemplateService } from '../services/emailtemplate.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
declare var CKEDITOR: any;

@Component({
  selector: 'app-emailtemplate',
  providers: [ EmailtemplateService ],
  templateUrl: './emailtemplate.component.html',
  styleUrls: ['./emailtemplate.component.css']
})
export class EmailtemplateComponent implements OnInit {
 emailEntity;
	submitted;
	btn_disable;
  header;
  des_valid;
  roleList;
  placeholderList;

  constructor( private http: Http,private globals: Globals, private router: Router, private EmailtemplateService: EmailtemplateService,private route:ActivatedRoute) { }

 ngOnInit() 
  {  
    this.globals.msgflag = false;
    this.des_valid = false;
    this.emailEntity = {};
    CKEDITOR.replace( 'EmailBody' );
  let id = this.route.snapshot.paramMap.get('id');
  this.EmailtemplateService.getDefaultList()
	.then((data) => 
	{
    this.roleList = data['role'];
    this.placeholderList = data['placeholder'];
	}, 
	(error) => 
	{
		alert('error');
	});	 
	if(id){
		this.header = 'Edit';
		this.EmailtemplateService.getById(id)
		.then((data) => 
		{ 
			if(data!=""){
				this.emailEntity = data;
      			CKEDITOR.instances.EmailBody.setData(this.emailEntity.EmailBody);	
			} else {
				this.router.navigate(['/dashboard']);
			}	      	
		}, 
		(error) => 
		{
			alert('error');
		});	 
	} else {
		this.header = 'Add';
    this.emailEntity = {};
    this.emailEntity.EmailId = 0;
    this.emailEntity.Token = '';
    this.emailEntity.To = '';
    this.emailEntity.Cc = '';
    this.emailEntity.Bcc = '';
    this.emailEntity.IsActive = '1';
  }
  
		CKEDITOR.on( 'instanceReady', function() {			
			CKEDITOR.document.getById( 'contactList' ).on( 'dragstart', function( evt ) {				
				var target = evt.data.getTarget().getAscendant( 'div', true );
				CKEDITOR.plugins.clipboard.initDragDataTransfer( evt );
				var dataTransfer = evt.data.dataTransfer;
				dataTransfer.setData( 'text/html', target.getText() );				
			} );
		} );

  }
   addEmailTemplate(EmailForm)
	{		
    this.emailEntity.EmailBody = CKEDITOR.instances.EmailBody.getData();
    if(this.emailEntity.EmailBody!=""){
			this.des_valid = false;
		} else {
			this.des_valid = true;
		}
		let id = this.route.snapshot.paramMap.get('id');
		if(id){			
			this.emailEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = false;
		} else {			
			this.emailEntity.CreatedBy = this.globals.authData.UserId;
			this.emailEntity.UpdatedBy = this.globals.authData.UserId;
			this.submitted = true;
		}
		if(EmailForm.valid && this.des_valid==false){
			this.btn_disable = true;
			this.EmailtemplateService.add(this.emailEntity)
			.then((data) => 
			{
				//alert('success');
				this.btn_disable = false;
				this.submitted = false;
				this.emailEntity = {};
				EmailForm.form.markAsPristine();
				if(id){
					this.globals.message = 'Update successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				} else {
					this.globals.message = 'Add successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
				}			
				this.router.navigate(['/emailtemplate/list']);
			}, 
			(error) => 
			{
				alert('error');
				this.btn_disable = false;
				this.submitted = false;
			});
		} 		
	}

	clearForm(EmailForm)
	{
		this.emailEntity = {};	
		this.emailEntity.EmailId = 0;
    this.emailEntity.IsActive = '1';	
    this.submitted = false;
    this.des_valid = false;
    this.emailEntity.Token = '';
    this.emailEntity.To = '';
    this.emailEntity.Cc = '';
    this.emailEntity.Bcc = '';
		CKEDITOR.instances.EmailBody.setData('');	
		EmailForm.form.markAsPristine();
	}

}

