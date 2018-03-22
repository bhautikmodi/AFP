import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CourcelevelService } from '../services/courcelevel.service';
import { Globals } from '.././globals';
@Component({
  selector: 'app-courcelevellist',
    providers: [ CourcelevelService ],
  templateUrl: './courcelevellist.component.html',
  styleUrls: ['./courcelevellist.component.css']
})
export class CourcelevellistComponent implements OnInit 
{
CourselevelList;
constructor(private http: Http, private router: Router, private route: ActivatedRoute, private CourcelevelService: CourcelevelService, private globals: Globals) 
  {
	
  }

 ngOnInit() {debugger
	this.CourcelevelService.getAll()
	//.map(res => res.json())
	.then((data) => 
	{
		this.CourselevelList = data;
	}, 
	(error) => 
	{
		alert('error');
	});	  
  }
	
	deleteCourselevel(Courselevel)
	{
		this.CourcelevelService.delete(Courselevel.ConfigurationId)
		.then((data) => 
		{
			let index = this.CourselevelList.indexOf(Courselevel);
			if (index != -1) {
				this.CourselevelList.splice(index, 1);
			}			
			alert(data);
		}, 
		(error) => 
		{
			alert('error');
		});		
	}
}
