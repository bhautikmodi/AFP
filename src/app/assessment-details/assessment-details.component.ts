import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AssessmentDetailsService } from '../services/assessment-details.service';
@Component({
  selector: 'app-assessment-details',
     providers: [ AssessmentDetailsService ],
  templateUrl: './assessment-details.component.html',
  styleUrls: ['./assessment-details.component.css']
})
export class AssessmentDetailsComponent implements OnInit {
AsmtDetailsEntity;
submitted;
btn_disable;
TeamSizeList;
header;
	type;
  constructor( private http: Http,private globals: Globals, private AssessmentDetailsService: AssessmentDetailsService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit() 
  {
	  this.AsmtDetailsEntity={};
	   this.AssessmentDetailsService.getTeamSize()
	//.map(res => res.json())
	.then((data) => 
	{
		this.TeamSizeList = data;
	}, 
	(error) => 
	{
		alert('error');
	});	
  }
addAsmtDetails(AsmtDetailsForm)
	{	debugger	
					
			// this.RegisterEntity.CreatedBy = this.globals.authData.UserId;
			this.AsmtDetailsEntity.UserId = this.globals.authData.UserId;
			this.submitted = true;
		
			
		
		if(AsmtDetailsForm.valid){
			this.btn_disable = true;
			this.AssessmentDetailsService.add(this.AsmtDetailsEntity)
			.then((data) => 
			{
				//alert('success');
				this.btn_disable = false;
				this.submitted = false;
				this.AsmtDetailsEntity = {};
				AsmtDetailsForm.form.markAsPristine();
					this.globals.message = 'Add successfully';
					this.globals.type = 'success';
					this.globals.msgflag = true;
							
				this.router.navigate(['/welcome_register']);
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
