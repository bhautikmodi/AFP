import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Globals } from '.././globals';
declare var $: any;
@Component({
  selector: 'app-courselist',
       providers: [ CourseService ],
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {
	CourseList;
	deleteEntity;
	msgflag;
	message;
 constructor( private http: Http,private globals: Globals, private router: Router, private CourseService: CourseService,private route:ActivatedRoute) { }
ngOnInit() { 
	this.CourseService.getAll()
	.then((data) => 
	{ 
		this.CourseList = data;	
		setTimeout(function(){
      $('#dataTables-example').dataTable( {
        "oLanguage": {
          "sLengthMenu": "_MENU_ Course per Page",
					"sInfo": "Showing _START_ to _END_ of _TOTAL_ Course",
					"sInfoFiltered": "(filtered from _MAX_ total Course)"
        }
      });
    },100); 

	}, 
	(error) => 
	{
		alert('error');
	});	
	this.msgflag = false;
  }

	deleteCourse(Course)
	{ 
		this.deleteEntity =  Course;
		$('#Delete_Modal').modal('show');					
	}

	deleteConfirm(Course)
	{ 
		this.CourseService.delete(Course.CourseId)
		.then((data) => 
		{
			let index = this.CourseList.indexOf(Course);
			$('#Delete_Modal').modal('hide');
			if (index != -1) {
				this.CourseList.splice(index, 1);
				//this.router.navigate(['/domain/list']);
				// setTimeout(function(){
				// 	$('#dataTables-example').dataTable( {
				// 		"oLanguage": {
				// 			"sLengthMenu": "_MENU_ Domains per Page",
				// 			"sInfo": "Showing _START_ to _END_ of _TOTAL_ Domains",
				// 			"sInfoFiltered": "(filtered from _MAX_ total Domains)"
				// 		}
				// 	});
				// },3000); 
			}			
			//alert(data);
			this.message = 'Delete successfully';
			this.msgflag = true;
		}, 
		(error) => 
		{
			alert('error');
		});		
	}
}
