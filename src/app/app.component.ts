import { Component } from '@angular/core';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  //globals;
  constructor(private globals: Globals) { }
  ngOnInit() {
    //this.globals = this.global;
    
  }
}
