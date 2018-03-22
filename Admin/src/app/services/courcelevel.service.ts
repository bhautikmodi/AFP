import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Globals } from '.././globals';
@Injectable()
export class CourcelevelService {


 constructor( private http: Http,private globals: Globals) { }
 
 add(CourseLevelEntity)
 {debugger
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'CourseLevel/add', CourseLevelEntity, this.globals.headerpath)
      .toPromise()
      .then(
        res => { // Success
          resolve(res.json());
        },
        msg => { // Error
		  reject(msg);
        }
      );
	});		
	return promise;
  }
  

delete(ConfigurationId)
  {
	let promise = new Promise((resolve, reject) => {		
    this.http.get(this.globals.baseAPIUrl + 'CourseLevel/delete/' + ConfigurationId, this.globals.headerpath)
      .toPromise()
      .then(
        res => { // Success
          resolve(res.json());
        },
        msg => { // Error
		  reject(msg);
        }
      );
	});		
	return promise;
  }
  
  getAll()
  {
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'CourseLevel/getAll', this.globals.headerpath)
      .toPromise()
      .then(
        res => { // Success
          resolve(res.json());
        },
        msg => { // Error
		  reject(msg);
        }
      );
	});		
	return promise;
  }
  
  getById(ConfigurationId)
  {debugger
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'CourseLevel/getById/' + ConfigurationId, this.globals.headerpath)
      .toPromise()
      .then(
        res => { // Success
          resolve(res.json());
        },
        msg => { // Error
		  reject(msg);
        }
      );
	});		
	return promise;
  }  
 }

