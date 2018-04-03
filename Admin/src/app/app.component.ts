import { Component } from '@angular/core';
import { Globals } from './globals';
import { ActivatedRoute } from '@angular/router';
import { RemainingService } from './services/remaining.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  remainingList;
	constructor(private route: ActivatedRoute, private RemainingService: RemainingService,private globals: Globals) { }
    
    ngOnInit()
  {
<<<<<<< HEAD
	 
=======
	 debugger
>>>>>>> 6a52eacf3c5a00190deb5e456450ad81a3abaf52
	// this.RemainingService.getAll()
	// //.map(res => res.json())
	// .then((data) => 
	// {
<<<<<<< HEAD
	// 	this.remainingList = data;
=======
		// this.remainingList = data;
>>>>>>> 6a52eacf3c5a00190deb5e456450ad81a3abaf52
			
	// }, 
	// (error) => 
	// {
<<<<<<< HEAD
	// 	alert('error');
=======
		// alert('error');
>>>>>>> 6a52eacf3c5a00190deb5e456450ad81a3abaf52
	// });	
    	
  }
}
