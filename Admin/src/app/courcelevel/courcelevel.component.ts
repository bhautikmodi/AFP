import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { CourcelevelService } from '../services/courcelevel.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courcelevel',
   providers: [ CourcelevelService ],
  templateUrl: './courcelevel.component.html',
  styleUrls: ['./courcelevel.component.css']
})
export class CourcelevelComponent implements OnInit {

	CourseLevelEntity;
	submitted;
	btn_disable;
	header;
  constructor( private http: Http,private globals: Globals, private router: Router, private CourcelevelService: CourcelevelService,private route:ActivatedRoute) { }

  ngOnInit() 
  {debugger
	  this.CourseLevelEntity = {};
	let id = this.route.snapshot.paramMap.get('id');
	if(id){
		this.header = 'Edit';
		this.CourcelevelService.getById(id)
		.then((data) => 
		{
			this.CourseLevelEntity = data;
			this.CourseLevelEntity.CourseLevel = data['Value'];
			this.CourseLevelEntity.Keyword = data['DisplayText'];
		
		}, 
		(error) => 
		{
			alert('error');
		});	 
	} else {
		this.header = '';
    this.CourseLevelEntity = {};
    this.CourseLevelEntity.IsActive = '1';
	}

  }
addCourseLevel(CourseLevelForm)
	{		
		let id = this.route.snapshot.paramMap.get('id');
		if(id){
			this.submitted = false;
		} else {
			this.CourseLevelEntity.ConfigurationId = 0;
			this.submitted = true;
		}
		if(CourseLevelForm.valid){
			this.btn_disable = true;
			this.CourcelevelService.add(this.CourseLevelEntity)
			.then((data) => 
			{
				alert('success');
				this.btn_disable = false;
				this.submitted = false;
				this.CourseLevelEntity = {};
				CourseLevelForm.form.markAsPristine();
				this.router.navigate(['/courselevel']);
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
