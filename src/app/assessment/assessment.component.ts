import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../services/assessment.service';
declare var $: any;

@Component({
  selector: 'app-assessment',
  providers: [ AssessmentService ],
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  ksaList;
  constructor(private AssessmentService: AssessmentService) { }

  ngOnInit() { 
    var progress = document.getElementById("progress");
    $(progress).css("width", "30%");
    
    

    this.AssessmentService.getAllksa()
		.then((data) => 
		{ 
      this.ksaList = data;
      console.log(this.ksaList);
      setTimeout(function(){
        $('#carousel').flexslider({
          animation: "slide",
          controlNav: false,
          animationLoop: false,
          slideshow: false,
          itemWidth: 160,
          minItems: 1,
          maxItems: 5,
          itemMargin: 5,
          asNavFor: '#slider'
        });
  
        $('#slider').flexslider({
          animation: "slide",
          controlNav: false,
          animationLoop: false,
          slideshow: false,
          sync: "#carousel"
        });
      },100); 
		}, 
		(error) => 
		{
			alert('error');
		});	 
  }

}
