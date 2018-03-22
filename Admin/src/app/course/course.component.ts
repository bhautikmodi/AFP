import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-course',
     providers: [ CourseService ],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
    CourseEntity;
	submitted;
	btn_disable;
	CourseLevelList;
	header;
  constructor( private http: Http,private globals: Globals, private router: Router, private CourseService: CourseService,private route:ActivatedRoute) { }

  ngOnInit() 
  {debugger
    this.CourseService.getCourseLevelList()
	.then((data) => 
	{
		this.CourseLevelList = data;
	}, 
	(error) => 
	{
		alert('error');
	});	 
	
	
	  this.CourseEntity = {};
	let id = this.route.snapshot.paramMap.get('id');
	if(id){
		this.header = 'Edit';
		this.CourseService.getById(id)
		.then((data) => 
		{
			this.CourseEntity = data;

		
		}, 
		(error) => 
		{
			alert('error');
		});	 
	} else {
		this.header = '';
    this.CourseEntity = {};
    this.CourseEntity.IsActive = '1';
	}

  }
addCourse(CourseForm)
	{		
		let id = this.route.snapshot.paramMap.get('id');
		if(id){
			this.submitted = false;
		} else {
			this.CourseEntity.CourseId = 0;
			this.submitted = true;
		}
		if(CourseForm.valid){
			this.btn_disable = true;
			this.CourseService.add(this.CourseEntity)
			.then((data) => 
			{
				alert('success');
				this.btn_disable = false;
				this.submitted = false;
				this.CourseEntity = {};
				CourseForm.form.markAsPristine();
				this.router.navigate(['/course/list/']);
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
