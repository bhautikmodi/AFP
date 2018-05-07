import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpInterceptorClassService implements HttpInterceptor { 
  constructor(private router: Router){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 

	  req.header('Access-Control-Allow-Origin', '*');
	  req.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      req.header('Access-Control-Allow-Headers', 'Content-Type');
      req.header('Access-Control-Allow-Credentials', true);
	  req.header('Authorization', `${localStorage.getItem('token')}`);
	  
    // req = req.clone({
      // setHeaders: {
		  // Access-Control-Allow-Origin: '*',
		  // Access-Control-Allow-Methods: 'GET, POST, PUT, DELETE',
		  // Access-Control-Allow-Headers: 'Content-Type',
		  // Access-Control-Allow-Credentials: true,
		  // Authorization: `${localStorage.getItem('token')}`
      // }
	  // setHeader('Access-Control-Allow-Origin', '*');
	  // setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      // setHeader('Access-Control-Allow-Headers', 'Content-Type');
      // setHeader('Access-Control-Allow-Credentials', true);
	  //setHeader('Authorization', `${localStorage.getItem('token')}`);
    //});

    return next.handle(req).do((event: HttpEvent<any>) => { debugger
      if (event instanceof HttpResponse) {
        if(event.body.error_code==2008){
          return this.router.navigate(['/dashboard']);
        } else {
          return next.handle(req);
        }        
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 406) {
          // redirect to the login route
          // or show a modal
        }
        return next.handle(req);
      }
    });
    
  }
} 
