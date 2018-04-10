import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';


@Injectable()
export class ResetpassService {

   constructor( private http: Http,private globals: Globals) { }
   
   
  add(UserId){debugger
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Resetpass/resetuserpass', UserId, this.globals.headerpath)
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
   
   getResetlink(){
	  debugger
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Resetpass/resetpasslink',  this.globals.headerpath)
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
