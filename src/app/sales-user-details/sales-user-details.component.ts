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
  // "balloonText": "",
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
var chart = AmCharts.makeChart( "scale_chart", {
  "type": "pie",
 "startDuration": 0,
  "dataProvider": [{
    "domain": "General Awareness",
    "value": 20,
    "color": "#002B49"
  }, {
    "domain": "Developing",
    "value": 30,
    "color": "#8F993E"
  }, {
    "domain": "Intermediate",
    "value": 10,
    "color": "#FB8F2E"
  }, {
    "domain": "Advanced",
    "value": 40,
    "color": "#279989"
  }],
  "valueField": "value",
  "titleField": "domain",
  "labelRadius": -20,
  "labelText": "[[percents]]%",
  "labelTickColor": "#FFFFFF",
  "color" : "#fff",
  "labelColorField": "#FFFFFF",
  // "balloonText": "",
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
var chart = AmCharts.makeChart( "ca_chart", {
  "type": "pie",
 "startDuration": 0,
  "dataProvider": [{
    "domain": "Corporate Strategy/Strategic Planning",
    "value": 15,
    "color": "#002B49"
  }, {
    "domain": "Data Strategy",
    "value": 5,
    "color": "#8F993E"
  }, {
    "domain": "Reporting and Analyzing Financial KPIs",
    "value": 10,
    "color": "#FB8F2E"
  }, {
    "domain": "Budgeting Processes",
    "value": 10,
    "color": "#279989"
  }, {
    "domain": "Understanding Financial concepts",
    "value": 15,
    "color": "#B9044A"
  }, {
    "domain": "Using Excel and Technology/Software",
    "value": 5,
    "color": "#642F6C"
  }, {
    "domain": "Financial Modeling",
    "value": 10,
    "color": "#0085AD"
  }, {
    "domain": "Effective Communications",
    "value": 15,
    "color": "#E94628"
  }, {
    "domain": "Influencing and Negotiating",
    "value": 5,
    "color": "#B7006A"
  }, {
    "domain": "Project Management",
    "value": 10,
    "color": "#FFC35C"
  }],
  "valueField": "value",
  "titleField": "domain",
  "labelRadius": -20,
  "labelText": "[[percents]]%",
  "labelTickColor": "#FFFFFF",
  "color" : "#fff",
  "labelColorField": "#FFFFFF",
  // "balloonText": "",
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
var chart = AmCharts.makeChart("gneraluser_result", {
  "type": "serial",
  "startDuration": 0,
  "dataProvider": [{
    "domain": "Strategy",
    "ratingscale": 4,
    "color": "#002B49"
  }, {
    "domain": "Gathering and Analyzing Information",
    "ratingscale": 2,
    "color": "#8F993E"
  }, {
    "domain": "Budgeting and Financal Principles",
    "ratingscale": 4,
    "color": "#FB8F2E"
  }, {
    "domain": "Forecasting with Systems and Tools",
    "ratingscale": 1,
    "color": "#279989"
  }, {
    "domain": "Communication and Presentation Techniques",
    "ratingscale": 3,
    "color": "#B9044A"
  }, {
    "domain": "Business Partnering",
    "ratingscale": 2,
    "color": "#642F6C"
  }],
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
	"title": "Domain",
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

}
