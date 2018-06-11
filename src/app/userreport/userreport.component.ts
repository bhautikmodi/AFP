import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-userreport',
  templateUrl: './userreport.component.html',
  styleUrls: ['./userreport.component.css']
})
export class UserreportComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    setTimeout(function(){ 
      if ($("body").height() < $(window).height()) {
        $('footer').addClass('footer_fixed');
      } 
    }, 100);


  }

}
