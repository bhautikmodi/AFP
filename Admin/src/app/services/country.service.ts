import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
@Injectable()
export class CountryService {

   constructor( private http: Http,private globals: Globals) { }
add(CountryEntity)
 {
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Country/add', CountryEntity, this.globals.headerpath)
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
  

delete(CountryId)
  {debugger
	let promise = new Promise((resolve, reject) => {		
    this.http.get(this.globals.baseAPIUrl + 'Country/delete/' + CountryId, this.globals.headerpath)
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
  {debugger
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Country/getAll', this.globals.headerpath)
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
  
  getById(CountryId)
  {debugger
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Country/getById/' + CountryId, this.globals.headerpath)
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

