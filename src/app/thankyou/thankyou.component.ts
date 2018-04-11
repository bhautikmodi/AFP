import { Component, OnInit } from '@angular/core';
declare var AmCharts : any;

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var chart = AmCharts.makeChart("thankyou_result_bar", {
      "type": "serial",
      "startDuration": 0,
      "dataProvider": [{
        "domain": "Strategy",
        "ratingscale": 4,
        "color": "#001F49"
      }, {
        "domain": "Gathering and Analyzing Information",
        "ratingscale": 2,
        "color": "#799628"
      }, {
        "domain": "Budgeting and Financal Principles",
        "ratingscale": 4,
        "color": "#F79317"
      }, {
        "domain": "Forecasting with Systems and Tools",
        "ratingscale": 1,
        "color": "#1BAC98"
      }, {
        "domain": "Communication and Presentation Techniques",
        "ratingscale": 3,
        "color": "#65287E"
      }, {
        "domain": "Business Partnering",
        "ratingscale": 2,
        "color": "#B8044A"
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

}
