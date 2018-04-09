import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChangepassService } from '../services/changepass.service';

@Component({
  selector: 'app-changepass',
   providers: [ChangepassService],
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
	newpassEntity;
	submitted;
	btn_disable;
	header;
	same;
  constructor( private http: Http,private globals: Globals, private router: Router,private route:ActivatedRoute,private ChangepassService:ChangepassService) { }

  ngOnInit() { this.newpassEntity={}; }
  
   addNewPassword(newpassForm)
  {		debugger
		let id = this.route.snapshot.paramMap.get('id');
		
	//var id=new JwtHelper().decodeToken(id);
	this.newpassEntity.UserId = id;
		if(id){
			this.submitted = false;
		} else {
			this.newpassEntity.UserId = 0;
			this.submitted = true;
		}
		if(newpassForm.valid)
		{	
		
			this.newpassEntity.UserId=this.globals.authData.UserId;
			this.btn_disable = true;
			this.ChangepassService.add(this.newpassEntity)
			.then((data) => 
			{
				if(data=='Code duplicate')
				{			this.globals.message = 'Wrong paasword';
							 this.globals.type = 'danger';
							 this.globals.msgflag = true;
							 this.btn_disable = false;
							this.submitted = false;
				}else
					{
						alert('success');
						//this.aa=true;
						this.btn_disable = false;
						this.submitted = false;
						this.newpassEntity = {};
						newpassForm.form.markAsPristine();
						
						
						this.router.navigate(['/']);
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
  
  checkpassword(){ 
		if(this.newpassEntity.cPassword != this.newpassEntity.nPassword){
			this.same = true;
		} else {
			this.same = false;
		}
		
	}

}
