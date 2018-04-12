import { Component, OnInit } from '@angular/core';
declare var AmCharts : any;
import { ThankyouService } from '../services/thankyou.service';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  providers: [ ThankyouService ],
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

  assessmentData;
  domainData;
  constructor(private ThankyouService: ThankyouService, private globals: Globals, private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.assessmentData = {};
    let id = this.route.snapshot.paramMap.get('id');    
    this.ThankyouService.getResult(id)
		.then((data) => 
		{ 
      if(data=='fail'){
        this.router.navigate(['/dashboard']);
      } else {
        this.assessmentData = data['assessment'];
        this.domainData = data['domain'];
        var chart = AmCharts.makeChart("thankyou_result_bar", {
          "type": "serial",
          "startDuration": 0,
          "dataProvider": this.domainData,
          "valueAxes": [{
            "position": "left",
            "title": "Rating Scale",
          "axisAlpha": 1, 
          "titleFontSize" : 16,
          "integersOnly": true,
            "minimum": 0,
          "maximum": 5,
          "precision" : 0,
            "dashLength": 5
          }],
          "categoryField": "domain",
          "categoryAxis": {
            "gridPosition": "start",
          "title": "Domains",
          "axisAlpha": 1, 
          "titleFontSize" : 16,
          "dashLength": 5,
            "autoWrap": true
          },
          "graphs": [{
            "balloonText": "<b>[[category]]: [[value]]</b>",
            "fillColorsField": "color",
            "fillAlphas": 1,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "ratingscale",
          "fixedColumnWidth": 40,
          "labelText" : "[[value]]"
          }],
          "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
          }
        });
      }
    }, 
		(error) => 
		{
			alert('error');
		});	   
  }

}
