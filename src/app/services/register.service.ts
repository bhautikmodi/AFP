import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
@Injectable()
export class RegisterService {

 constructor( private http: Http,private globals: Globals) { }
 
 add(RegisterEntity)
  {debugger
   let promise = new Promise((resolve, reject) => {
     this.http.post(this.globals.baseAPIUrl + 'Register/add', RegisterEntity, this.globals.headerpath)
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
   
   
   getAllCountry()
  {
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Register/getAllCountry', this.globals.headerpath)
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
  getAllState(){debugger
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Register/getAllState',  this.globals.headerpath)
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
   getStateList(CountryId){debugger
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Register/getStateList/' + CountryId, this.globals.headerpath)
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
