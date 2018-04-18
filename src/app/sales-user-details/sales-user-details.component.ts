import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '.././globals';
import { ActivatedRoute } from '@angular/router';
declare var AmCharts: any;
@Component({
  selector: 'app-sales-user-details',

  templateUrl: './sales-user-details.component.html',
  styleUrls: ['./sales-user-details.component.css']
})
export class SalesUserDetailsComponent implements OnInit {
  assessmentList;
  constructor( private globals: Globals, private route: ActivatedRoute,private router: Router) { }



  ngOnInit() {  debugger
    var chart = AmCharts.makeChart("dashboard_result_bar" {
      "type": "serial",
      "startDuration": 0,
      "dataProvider": [{
        "domain": "Strategy",
        "value": 30,
        "color": "#002B49"
      }, {
        "domain": "Gathering and Analyzing Information",
        "value": 30,
        "color": "#8F993E"
      }, {
        "domain": "Budgeting and Financal Principles",
        "value": 10,
        "color": "#FB8F2E"
      }, {
        "domain": "Forecasting with Systems and Tools",
        "value": 10,
        "color": "#279989"
      }, {
        "domain": "Communication and Presentation Techniques",
        "value": 10,
        "color": "#B9044A"
      }, {
        "domain": "Business Partnering",
        "value": 10,
        "color": "#642F6C"
      }],
      "valueField": "value",
  "titleField": "domain",
  "labelRadius": -20,
  "labelText": "[[percents]]%",
  "labelTickColor": "#FFFFFF",
  "color" : "#fff",
  "labelColorField": "#FFFFFF",
  "balloonText": "",
  "colorField": "color",
  "percentPrecision" : 0,
  "balloon":{
   	"fixedPosition":true
  },
 "balloonText": "[[domain]]<br><b>([[percents]]%)</b>",
  "export": {
    "enabled": false
  }
});

var chart = AmCharts.makeChart( "domain_chart", {
  "type": "pie",
 "startDuration": 0,
  "dataProvider": [{
    "domain": "Strategy",
    "value": 30,
    "color": "#002B49"
  }, {
    "domain": "Gathering and Analyzing Information",
    "value": 30,
    "color": "#8F993E"
  }, {
    "domain": "Budgeting and Financal Principles",
    "value": 10,
    "color": "#FB8F2E"
  }, {
    "domain": "Forecasting with Systems and Tools",
    "value": 10,
    "color": "#279989"
  }, {
    "domain": "Communication and Presentation Techniques",
    "value": 10,
    "color": "#B9044A"
  }, {
    "domain": "Business Partnering",
    "value": 10,
    "color": "#642F6C"
  }],
  "valueField": "value",
  "titleField": "domain",
  "labelRadius": -20,
  "labelText": "[[percents]]%",
  "labelTickColor": "#FFFFFF",
  "color" : "#fff",
  "labelColorField": "#FFFFFF",
  "balloonText": "",
  "colorField": "color",
  "percentPrecision" : 0,
  "balloon":{
   	"fixedPosition":true
  },
 "balloonText": "[[domain]]<br><b>([[percents]]%)</b>",
  "export": {
    "enabled": false
  }
});



  
  }

}
