import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../services/assessment.service';

@Component({
  selector: 'app-test-assessment',
  providers: [ AssessmentService ],
  templateUrl: './test-assessment.component.html',
  styleUrls: ['./test-assessment.component.css']
})
export class TestAssessmentComponent implements OnInit {

  ksaDetails;
  constructor(private AssessmentService: AssessmentService) { }

  ngOnInit() {
    this.ksaDetails={};
    this.AssessmentService.testKsa()
		.then((data) => 
		{
      this.ksaDetails = data;
      console.log(this.ksaDetails);
    }, 
		(error) => 
		{
			alert('error');
		});
  }

}
