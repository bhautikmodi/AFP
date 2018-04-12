import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';

@Injectable()
export class AssessmentService {

  constructor( private http: Http,private globals: Globals) { }

  getAllksa(UserId) 
  { debugger
	let promise = new Promise((resolve, reject) => { 
    this.http.get(this.globals.baseAPIUrl + 'Assessment/getAllKSA/'+UserId, this.globals.headerpath)
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

  saveKsa(ksaEntity)
  {
	let promise = new Promise((resolve, reject) => { 
    this.http.post(this.globals.baseAPIUrl + 'Assessment/saveKsa',ksaEntity, this.globals.headerpath)
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

  finalSubmit(CAssessmentId)
  {
	let promise = new Promise((resolve, reject) => { 
    this.http.get(this.globals.baseAPIUrl + 'Assessment/finalSubmit/'+CAssessmentId, this.globals.headerpath)
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
