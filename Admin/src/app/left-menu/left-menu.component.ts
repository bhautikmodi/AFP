import { Component, OnInit } from '@angular/core';
import { Globals } from '.././globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  constructor(private globals: Globals, private router: Router) { }

  ngOnInit() {
  }

  menuopen(path){ 
	  this.router.navigate([path]);
    this.globals.currentLink = this.router.url;
  }

}

