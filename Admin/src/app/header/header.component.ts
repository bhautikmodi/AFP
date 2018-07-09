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
globals;
db_mode;
  constructor(private router: Router,private global: Globals, private authService: AuthService) { }

  ngOnInit() {
    this.globals = this.global;
    this.authService.db_mode()
      .then((data) => 
      {
        this.db_mode = data;
      }, 
      (error) => 
      {
        //alert('error');
        this.globals.isLoading = false;
        this.router.navigate(['/pagenotfound']);
      });
  }
  logout()
    { 
        var admin={'Userid':this.globals.authData.UserId,'paneltype':1};
        this.authService.logout(admin)
	//.map(res => res.json())
      .then((data) => 
      {
        this.globals.isLoading = true;
        window.location.href = '/login';
            
      }, 
      (error) => 
      {
       // alert('error');
       this.globals.isLoading = false;
	     this.router.navigate(['/pagenotfound']);
      });
          
    }
  // logout(){	 
  //   this.authService.logout();
  //   this.globals.isLoading = true;
  //   window.location.href = '/login';		
  // }

}
