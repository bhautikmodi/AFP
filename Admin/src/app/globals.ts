import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class Globals { debugger

  constructor() { }

<<<<<<< HEAD
=======
  //baseAPIUrl: string = 'http://13.58.119.180:4700/AFP/api/';  
>>>>>>> c778ae3eac8e74d2d0d40805b5f4fe90cacd4ae0
  baseAPIUrl: string = 'http://localhost/AFP/api/';  
  headerpath: string = "{'Content-Type': 'application/json','Accept': 'application/json'}";
  IsLoggedIn: boolean = false;
  isLoading: boolean = false;
  currentLink: string = '';
  authData = localStorage.getItem('token') ? new JwtHelper().decodeToken(localStorage.getItem('token')):null;
  msgflag = false;
  message = '';
  type = '';
  
}