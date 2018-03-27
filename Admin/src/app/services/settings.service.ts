import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';

@Injectable()
export class SettingsService {

  constructor(private http: Http, private globals: Globals) { }

  add(teamsizeEntity){
	let promise = new Promise((resolve, reject) => {
    this.http.post(this.globals.baseAPIUrl + 'Settings/add', teamsizeEntity, this.globals.headerpath)
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
  
  delete(TeamSizeId){
	let promise = new Promise((resolve, reject) => {		
    this.http.get(this.globals.baseAPIUrl + 'Settings/delete/' + TeamSizeId, this.globals.headerpath)
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
    this.http.get(this.globals.baseAPIUrl + 'Settings/getAll', this.globals.headerpath)
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
  
  // getById(TeamSizeId){
	// let promise = new Promise((resolve, reject) => {
  //   this.http.get(this.globals.baseAPIUrl + 'Settings/getById/' + TeamSizeId, this.globals.headerpath)
  //     .toPromise()
  //     .then(
  //       res => { // Success
  //         resolve(res.json());
  //       },
  //       msg => { // Error
	// 	  reject(msg);
  //       }
  //     );
	// });		
	// return promise;
  // }  

}

