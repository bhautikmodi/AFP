import { Component, OnInit } from '@angular/core';
import { Globals } from '.././globals';
@Component({
  selector: 'app-headerhome',
  templateUrl: './headerhome.component.html',
  styleUrls: ['./headerhome.component.css']
})
export class HeaderhomeComponent implements OnInit {

  constructor(private globals: Globals) { }

  ngOnInit() {
  }

}
