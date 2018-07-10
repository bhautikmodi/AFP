import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';
import { Router } from '@angular/router';
@Injectable()
export class ContactusService {

<<<<<<< HEAD
  constructor( private http: Http,private globals: Globals,private router: Router) { }
=======
  constructor( private http: Http,public globals: Globals) { }
>>>>>>> 50d1b5b78a73220700e63768cc81a4a0e65a555a
  add(ContactEntity){  
    
   let promise = new Promise((resolve, reject) => {
     this.http.post(this.globals.baseAPIUrl + 'Contact/add', ContactEntity, this.globals.headerpath)
       .toPromise()
       .then( 
         res => { // Success 
       resolve(res.json());
         },
         msg => { // Error
       reject(msg.json());
       this.globals.isLoading = false;
       this.router.navigate(['/pagenotfound']);
         }
       );
   });		
   return promise;
   }
   getById(CId){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'Contact/getById/' + CId, this.globals.headerpath)
        .toPromise()
        .then(
          res => { // Success
            resolve(res.json());
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
