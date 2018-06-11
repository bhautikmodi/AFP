import { Component, OnInit } from '@angular/core';
import { Globals } from '.././globals';

@Component({
  selector: 'app-footer',
  providers: [ Globals ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  globals;
  constructor(private global: Globals) { }

  ngOnInit() {
    this.globals = this.global;
  }

}
