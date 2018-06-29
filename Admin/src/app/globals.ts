import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class Globals { 

  constructor() { }
 
  baseAPIUrl: string = 'http://afp.uatbyopeneyes.com/api/';
  baseUrl: string = 'http://afp.uatbyopeneyes.com:4200';
  headerpath: string = "{'Content-Type': 'application/json','Accept': 'application/json'}";
  IsLoggedIn: boolean = false;
  isLoading: boolean = false;
  currentLink: string = '';
  authData = localStorage.getItem('token') ? new JwtHelper().decodeToken(localStorage.getItem('token')):null;
  msgflag = false;
  message = '';
  type = '';
  
}