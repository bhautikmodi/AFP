import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../services/assessment.service';
declare var $: any;

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
    this.ksaDetails=[];
    this.AssessmentService.testKsa()
		.then((data) => 
		{
      this.ksaDetails = data;
      setTimeout(function(){
        $('#dataTables-example').dataTable( {
          "oLanguage": {
            "sLengthMenu": "_MENU_ ksa per Page",
            "sInfo": "Showing _START_ to _END_ of _TOTAL_ ksa",
            "sInfoFiltered": "(filtered from _MAX_ total ksa)"
          }
        });
      },1000);
    }, 
		(error) => 
		{
			alert('error');
		});
  }

}
