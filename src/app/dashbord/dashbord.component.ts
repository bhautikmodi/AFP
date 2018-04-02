import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
	  
	  $('.bxslider').bxSlider({
		 mode: 'fade',
		 captions: true,
  		 auto:true,
		 controls : false
	});
  }

}
