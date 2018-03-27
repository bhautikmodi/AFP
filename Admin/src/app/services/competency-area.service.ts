import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';

@Injectable()
export class CompetencyAreaService {

  constructor(private http: Http, private globals: Globals) { }

  add(areaEntity){ debugger
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Competency_Area/add', areaEntity, this.globals.headerpath)
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
    
  delete(Competency_AreaId){
	let promise = new Promise((resolve, reject) => {		
    this.http.get(this.globals.baseAPIUrl + 'Competency_Area/delete/' + Competency_AreaId, this.globals.headerpath)
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
    this.http.get(this.globals.baseAPIUrl + 'Competency_Area/getAll', this.globals.headerpath)
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
  
  getById(Competency_AreaId){
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Competency_Area/getById/' + Competency_AreaId, this.globals.headerpath)
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

   getDomainList(){
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Competency_Area/getDomainList', this.globals.headerpath)
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

