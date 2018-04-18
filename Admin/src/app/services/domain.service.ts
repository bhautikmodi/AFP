import { Injectable } from '@angular/core';
import { Http } from '@angular//http';
import { Globals } from '.././globals';

@Injectable()
export class DomainService {
  constructor(private http: Http, private globals: Globals) { 
  }

  add(domainEntity){
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Domain/add', domainEntity, this.globals.headerpath)
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
  
  delete(DomainId){
	let promise = new Promise((resolve, reject) => {		
    this.http.get(this.globals.baseAPIUrl + 'Domain/delete/' + DomainId, this.globals.headerpath)
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

  
  getAll(){     
	let promise = new Promise((resolve, reject) => {     
    this.http.get(this.globals.baseAPIUrl + 'Domain/getAll', this.globals.headerpath)
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
  
  getById(DomainId){ 
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Domain/getById/' + DomainId, this.globals.headerpath)
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
