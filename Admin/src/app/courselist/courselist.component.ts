import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Globals } from '.././globals';
@Component({
  selector: 'app-courselist',
       providers: [ CourseService ],
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {
CourseList;
 constructor( private http: Http,private globals: Globals, private router: Router, private CourseService: CourseService,private route:ActivatedRoute) { }


  ngOnInit() {debugger
	this.CourseService.getAll()
	//.map(res => res.json())
	.then((data) => 
	{
		this.CourseList = data;
	}, 
	(error) => 
	{
		alert('error');
	});	  
  }
	
	deleteCourse(Course)
	{
		this.CourseService.delete(Course.CourseId)
		.then((data) => 
		{
			let index = this.CourseList.indexOf(Course);
			if (index != -1) {
				this.CourseList.splice(index, 1);
			}			
			alert(data);
		}, 
		(error) => 
		{
			alert('error');
		});		
	}
}
