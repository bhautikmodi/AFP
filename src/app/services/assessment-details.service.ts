import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
@Injectable()
export class AssessmentDetailsService {

 constructor( private http: Http,private globals: Globals) { }
  add(AsmtDetailsEntity)
  {debugger
   let promise = new Promise((resolve, reject) => {
     this.http.post(this.globals.baseAPIUrl + 'AssessmentDetails/add', AsmtDetailsEntity, this.globals.headerpath)
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
  getTeamSize(){
	 
	let promise = new Promise((resolve, reject) => {
    this.http.get(this.globals.baseAPIUrl + 'AssessmentDetails/getAllTeamSize',  this.globals.headerpath)
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
