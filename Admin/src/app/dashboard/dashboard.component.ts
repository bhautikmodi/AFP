import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
declare var AmCharts: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data;
  constructor(private globals: Globals) { }

  ngOnInit() {

    this.data = [
      {
        "country": "Lithuania sdfdf",
        "value": 260
      },
      {
        "country": "Ireland",
        "value": 201
      },
      {
        "country": "Germany",
        "value": 65
      },
      {
        "country": "Australia",
        "value": 39
      },
      {
        "country": "UK",
        "value": 19
      },
      {
        "country": "Latvia",
        "value": 10
      }
    ];

    var chart = AmCharts.makeChart( "chartdiv", {
      "type": "pie",
      "theme": "light",
      "dataProvider": this.data,
      "valueField": "value",
      "titleField": "country",
      "outlineAlpha": 0.4,
      "depth3D": 15,
      "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
      "angle": 30,
      "export": {
        "enabled": true
      }
    });

  }

}
