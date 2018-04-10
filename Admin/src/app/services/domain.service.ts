import { Injectable } from '@angular/core';
import { Http } from '@angular//http';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Globals } from '.././globals';

@Injectable()
export class DomainService {
  h1;
  constructor(private http: Http,private httpc: HttpClient, private globals: Globals) { 
    this.h1 = new HttpHeaders().set('token', '994847565472878394039283578235');
    this.h1
    "{'Content-Type': 'application/json','Accept': 'application/json'}";
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
  
  getAll(){ debugger    
	let promise = new Promise((resolve, reject) => {     
    this.http.get(this.globals.baseAPIUrl + 'Domain/getAll', this.h1)
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
