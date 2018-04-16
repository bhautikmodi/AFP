import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
@Injectable()
export class SalesDashboardService {

  constructor(private http: Http, private globals: Globals) { }
  // add(SalesDashboardEntity){ 
  //   let promise = new Promise((resolve, reject) => {
  //     this.http.post(this.globals.baseAPIUrl + 'Sales_dashboard/addCompany/', SalesDashboardEntity, this.globals.headerpath)
  //       .toPromise()
  //       .then(
  //         res => { // Success
  //           resolve(res.json());
  //         },
  //         msg => { // Error
  //       reject(msg);
  //         }
  //       );
  //   });		
  //   return promise;
  //   }
  getAllUser()
  {
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Sales_dashboard/getAllUser', this.globals.headerpath)
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
  
  
  getAllCompany()
  {
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'Sales_dashboard/getAllCompany', this.globals.headerpath)
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
