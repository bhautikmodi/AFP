import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ForgotpasswordService } from '../services/forgotpassword.service';

@Component({
  selector: 'app-forgotpassword',
   providers: [ForgotpasswordService],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
	fgpassEntity;
	submitted;
	type;
	btn_disable;
 constructor( private http: Http,private globals: Globals, private router: Router,private route:ActivatedRoute,private ForgotpasswordService:ForgotpasswordService) { }

  ngOnInit() {this.fgpassEntity={};
  }
  
  
  addFgpass(fgpassForm)
	{		
	
		
			this.submitted = true;
		
		if(fgpassForm.valid){
			 this.fgpassEntity.EmailAddress;
		
			this.btn_disable = true;
			this.ForgotpasswordService.add(this.fgpassEntity)
			.then((data) => 
			{debugger
				if(data=='Code duplicate')
				{
						this.globals.message = 'Invalid Userid';
						this.globals.type = 'danger';
						this.globals.msgflag = true;
						this.btn_disable = false;
						this.submitted = false;
					//this.router.navigate(['/fgpass/']);
				}else
				{
						//alert('success');
					this.btn_disable = false;
					this.submitted = false;
					localStorage.setItem('EmailAddress',this.fgpassEntity.EmailAddress);
					this.fgpassEntity = {};
					fgpassForm.form.markAsPristine();
						//this.globals.message = 'Check user Email-Id';
						//this.globals.type = 'success';
						//this.globals.msgflag = true;
						
					
					
						//alert(id);
				
				
					
				}
				this.router.navigate(['/login']);
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
