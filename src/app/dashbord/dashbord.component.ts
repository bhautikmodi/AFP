import { Component, OnInit } from '@angular/core';
import { DashbordService } from '../services/dashbord.service';

@Component({
  selector: 'app-dashbord',
   providers: [ DashbordService],
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  constructor(  private DashbordService: DashbordService) { }

 

  
   ngOnInit() {
  }

}
