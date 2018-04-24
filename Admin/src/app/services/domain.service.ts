import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DomainService {
  constructor(private http: HttpClient, private globals: Globals) { 
  }

  add(domainEntity){
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Domain/add', domainEntity)
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
  
  delete(DomainId){
	let promise = new Promise((resolve, reject) => {		
    this.http.get(this.globals.baseAPIUrl + 'Domain/delete/' + DomainId)
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

  
  getAll(){     
	let promise = new Promise((resolve, reject) => {     
    this.http.get(this.globals.baseAPIUrl + 'Domain/getAll')
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
    this.http.get(this.globals.baseAPIUrl + 'Domain/getById/' + DomainId)
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
