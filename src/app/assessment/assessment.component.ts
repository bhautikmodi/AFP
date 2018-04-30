import { Component, OnInit } from '@angular/core';
import { AssessmentService } from '../services/assessment.service';
import { Router } from '@angular/router';
declare var $,PerfectScrollbar: any;
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assessment',
  providers: [ AssessmentService ],
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  ksaList;
  totalksa;
  addprogess;
  submit_true;
  arrayset;
  constructor(private AssessmentService: AssessmentService, private globals: Globals, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() { 
    debugger
    var progress = document.getElementById("progress");
    $(progress).css("width", "0%");    
    let id = this.route.snapshot.paramMap.get('id');    
    this.AssessmentService.getAllksa(id)
		.then((data) => 
		{ 
      if(data=='fail'){
        this.router.navigate(['/dashboard']);
      } else {
        this.ksaList = data['ksa'];
        this.totalksa = data['totalksa'];
        this.addprogess = 100/this.totalksa;
        
        setTimeout(()=>{  
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
          $('[data-toggle="tooltip"]').tooltip();
          new PerfectScrollbar('.preview_ksa .scroll_table');

          for(let obj of this.ksaList){
            let j = this.ksaList.indexOf(obj);
            for(let child of obj.row){
              let i = this.ksaList[j].row.indexOf(child);
              if(child.RatingScaleId>0){
                $('#ksa'+((8*j)+i+1)+'_dots').removeClass('fa-circle-o');
                $('#ksa'+((8*j)+i+1)+'_dots').addClass('fa-dot-circle-o');
              }          
            }
          } 
          this.checkprogress();
        },100);
      }        
		}, 
		(error) => 
		{
			alert('error');
		});	 
  }

  finalSubmit()
	{	 
    $('#PreviewModal').modal('show');	    	
  }

  confirmsubmit(){
    this.globals.isLoading = true;
    let CAssessmentId = this.route.snapshot.paramMap.get('id');
		this.AssessmentService.finalSubmit(CAssessmentId)
		.then((data) => 
		{
      $('#PreviewModal').modal('hide');	
      this.router.navigate(['/thankyou/'+CAssessmentId]);
      this.globals.isLoading = false;
    }, 
		(error) => 
		{
      this.globals.isLoading = false;
			alert('error');
		});
  }

  selectRadio(no,ksa,i,j){     
    this.AssessmentService.saveKsa(ksa)
		.then((data) => 
		{
      var progress = document.getElementById("progress");
      $('#ksa' + no + '_dots').removeClass('fa-circle-o');
      $('#ksa' + no + '_dots').addClass('fa-dot-circle-o');
      this.checkprogress();
    }, 
		(error) => 
		{
			alert('error');
		});	 
  } 
  
  checkprogress(){
    let k = 0; 
      for(let i=1; i<=this.totalksa; i++){
        if($('#ksa' + i + '_dots').hasClass('fa-dot-circle-o')){
          k++;
        }
      }
      let addpro = (100*k)/this.totalksa;
      var progress = document.getElementById("progress");
      $(progress).css("width", addpro+"%");
      if(k==this.totalksa){
        this.submit_true = false;
      } else {
        this.submit_true = true;
      }
  }

}
