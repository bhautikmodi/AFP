import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';

@Injectable()
export class ChangepassService {

  constructor( private http: Http,private globals: Globals) { }
  
  add(UserId){debugger
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Changepass/changeuserpass', UserId, this.globals.headerpath)
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
