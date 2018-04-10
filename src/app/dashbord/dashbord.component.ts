import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { DashbordService } from '../services/dashbord.service';
import { Globals } from '.././globals';
declare var $: any;

@Component({
  selector: 'app-dashbord',
   providers: [ DashbordService],
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
Disinv;
  constructor( private http: Http,private globals: Globals,  private DashbordService: DashbordService) { }

 

  ngOnInit() {debugger
	  
	  $('.bxslider').bxSlider({
		 mode: 'fade',
		 captions: true,
  		 auto:true,
		 controls : false
	});
	this.Disinv = '';
  //this.DashbordService.getAll()
	//.map(res => res.json())
	.then((data) => 
	{
			this.Disinv = data['Disinv'];
	}, 
	(error) => 
	{
		alert('error');
	});	
  
  }

}
