import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
@Injectable()
export class AuditlogService {
<<<<<<< HEAD
  constructor(private http: HttpClient, private globals: Globals, private router: Router) { 
=======
  constructor(private http: HttpClient, public globals: Globals) { 
>>>>>>> 50d1b5b78a73220700e63768cc81a4a0e65a555a
  }

  getEmailLog(){     
	let promise = new Promise((resolve, reject) => {     
    this.http.get(this.globals.baseAPIUrl + 'AuditLog/getEmailLog')
      .toPromise()
      .then(
        res => { // Success
          resolve(res);
        },
        msg => { // Error
      reject(msg);
      this.globals.isLoading = false;
      this.router.navigate(['/pagenotfound']);
        }
      );
  });	
	return promise;
  }

  getLoginLog(){     
    let promise = new Promise((resolve, reject) => {     
      this.http.get(this.globals.baseAPIUrl + 'AuditLog/getLoginLog')
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          },
          msg => { // Error
        reject(msg);
        this.globals.isLoading = false;
				this.router.navigate(['/pagenotfound']);
          }
        );
    });	
    return promise;
    }
    
    getActivityLog(){     
      let promise = new Promise((resolve, reject) => {     
        this.http.get(this.globals.baseAPIUrl + 'AuditLog/getActivityLog')
          .toPromise()
          .then(
            res => { // Success
              resolve(res);
            },
            msg => { // Error
          reject(msg);
          this.globals.isLoading = false;
          this.router.navigate(['/pagenotfound']);
            }
          );
      });	
      return promise;
      }
  
}


