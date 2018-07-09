import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';

@Injectable()
export class ContactusService {

  constructor( private http: Http,public globals: Globals) { }
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
          }
        );
    });		
    return promise;
    }  

}
