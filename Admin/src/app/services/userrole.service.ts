import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';

@Injectable()
export class UserroleService {

  constructor(private http: Http, private globals: Globals) {  }
  
  add(userroleEntity){ 
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Userrole/addUserrole', userroleEntity, this.globals.headerpath)
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
  
  getAll(){ debugger
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Userrole/getAll', this.globals.headerpath)
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
  
  
  deleteUserrole(roleId){  debugger
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Userrole/delete/' + roleId, this.globals.headerpath)
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
  
  getById(roleId){debugger
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Userrole/getById/' + roleId, this.globals.headerpath)
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
