
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ListUserAssessmentService {

  constructor(private http: HttpClient, private globals: Globals) { }



  getAllCompany(){
	  
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Company/getAll')
      .toPromise()
      .then(
        res => { // Success
          resolve(res);
        },
        msg => { // Error
		  reject(msg);
        }
      );
	});		
	return promise;
  }


  getAllUserAssess(){
	  
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'User/getAllUserList')
      .toPromise()
      .then(
        res => { // Success
          resolve(res);
        },
        msg => { // Error
		  reject(msg);
        }
      );
	});		
	return promise;
  }



}
