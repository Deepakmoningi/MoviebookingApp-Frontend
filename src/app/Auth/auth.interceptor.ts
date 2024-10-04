import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router:Router,private tostr:ToastrService){} 

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  if(localStorage.getItem('token')!=null)
  {
    const clonedReq=req.clone({
        headers:req.headers.set('Authorization','Bearer '+localStorage.getItem('token'))
    });

    return next.handle(clonedReq).pipe(
        tap({
         next: (success)=>{},
          error: (err)=>{
                if(err.status==401)
                {
                  this.tostr.warning("Token is expired, please Login again");
                  localStorage.removeItem('token');
                  localStorage.removeItem('username');
                  this.router.navigateByUrl('/login');
                }    
            }
        }))
  }
  else
  {
   return next.handle(req.clone());
  }
}
}




