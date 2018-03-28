import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Globals } from '.././globals';
@Injectable()
export class InvitationService {

  constructor( private http: Http,private globals: Globals) { }

  add(InvitationEntity)
  {debugger
   let promise = new Promise((resolve, reject) => {
     this.http.post(this.globals.baseAPIUrl + 'Invitation/add', InvitationEntity, this.globals.headerpath)
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
   
   
    getAll()
   {
   let promise = new Promise((resolve, reject) => {
     this.http.get(this.globals.baseAPIUrl + 'Invitation/getAll', this.globals.headerpath)
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
 
 delete(UserInvitationId)
   {
   let promise = new Promise((resolve, reject) => {		
     this.http.get(this.globals.baseAPIUrl + 'Invitation/delete/' + UserInvitationId, this.globals.headerpath)
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
   
  
   
  //  getById(UserInvitationId)
  //  {debugger
  //  let promise = new Promise((resolve, reject) => {
  //    this.http.get(this.globals.baseAPIUrl + 'Invitation/getById/' + UserInvitationId, this.globals.headerpath)
  //      .toPromise()
  //      .then(
  //        res => { // Success
  //          resolve(res.json());
  //        },
  //        msg => { // Error
  //      reject(msg);
  //        }
  //      );
  //  });		
  //  return promise;
  //  }  
  }
 
 
