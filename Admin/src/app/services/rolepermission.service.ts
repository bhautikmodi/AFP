import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '.././globals';

@Injectable()
export class RolepermissionService {

  constructor(private http: Http, private globals: Globals) { }

  getDefault(){  
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.globals.baseAPIUrl + 'RolePermission/getDefault', this.globals.headerpath)
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

    getRolePermission(roleId){  
      let promise = new Promise((resolve, reject) => {
        this.http.get(this.globals.baseAPIUrl + 'RolePermission/getRolePermission/' + roleId, this.globals.headerpath)
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

      update_permission(permission){  debugger
        let promise = new Promise((resolve, reject) => {
          this.http.post(this.globals.baseAPIUrl + 'RolePermission/update_permission', permission, this.globals.headerpath)
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
