import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
//import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ContactusService } from '../services/contactus.service';

declare var $: any;

@Component({
  selector: 'app-contactus',
  providers: [ ContactusService ],
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  ContactEntity;
  submitted;
  submitted1;
	btn_disable;
	header;
	globals;
  constructor( private http: Http,private global: Globals, private router: Router, private ContactusService: ContactusService,private route:ActivatedRoute) { }


  ngOnInit() {
		this.globals = this.global;
		if(this.globals.msgflag){
			this.globals.msgflag=true;
		} else {
			this.globals.msgflag=false;
		}		
    	this.ContactEntity = {};
    if ($("body").height() < $(window).height()) {
      $('footer').addClass('footer_fixed');
  }

  let id = this.route.snapshot.paramMap.get('id');
	if (id) {
		this.header = 'Edit';
		this.ContactusService.getById(id)
			.then((data) => {
				this.ContactEntity = data;

			},
			(error) => {
				alert('error');
				this.btn_disable = false;
        this.submitted = false;
        this.submitted1 = false;
			});
	}
	else {
		this.header = 'Add';
		this.ContactEntity = {};
	
	}
  }
  addContact(ContactForm) {
    let id = this.route.snapshot.paramMap.get('id');
	if (id) {
			this.submitted = false;
  }else
  {
    this.submitted = true;
  }
  this.submitted1 = true;
		if (ContactForm.valid) {
      this.btn_disable = true;
			this.ContactusService.add(this.ContactEntity)
				.then((data) => {
					//alert('success');
					this.btn_disable = false;
          this.submitted = false;
          this.submitted1 = false;
					this.ContactEntity = {};
			 
					ContactForm.form.markAsPristine();
						this.globals.message = 'Thank you! Your message has been successfully sent We will contact you very soon!';
						this.globals.type = 'success';
						this.globals.msgflag = true;
			
					this.router.navigate(['/contactus']);
				},
				(error) => {
					alert('error');
					this.btn_disable = false;
					this.submitted = false;
				});
		}
	}

}
