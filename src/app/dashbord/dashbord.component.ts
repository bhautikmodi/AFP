import { Component, OnInit } from '@angular/core';
import { DashbordService } from '../services/dashbord.service';

@Component({
  selector: 'app-dashbord',
   providers: [ DashbordService],
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(  private DashbordService: DashbordService) { }

 

<<<<<<< HEAD
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
  
=======
   ngOnInit() {
>>>>>>> 31098b3c7e398a96be60c1b14e18ba768fff4fc9
  }

}
