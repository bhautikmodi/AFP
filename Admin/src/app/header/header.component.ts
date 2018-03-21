import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService : AuthService,private router: Router,private globals: Globals) { }

  ngOnInit() {
  }
  
  logout(){	 
    this.authService.logout();
    this.globals.isLoading = true;
    window.location.href = '/login';		
  }

}
