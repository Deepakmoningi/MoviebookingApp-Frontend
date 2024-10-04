import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //readonly BaseURL='https://localhost:7014/api/Login/'
  readonly BaseURL='https://moviebookingauthapi-hkdbcmcegya9eva8.eastus-01.azurewebsites.net/api/Login/'

  constructor(private http:HttpClient) { }

  isAdmin=false;
  public username:any;
  public status(){
    if(localStorage.getItem('token')!=null){
      this.username=localStorage.getItem('username');
      const token=localStorage.getItem('token');
      if(token){
          const decodeToken:any = jwtDecode(token);
          this.isAdmin=decodeToken.role.includes('Admin');
      }
      return true;
    }
    else{
      return false;
    }
  }

  login(formData:any){
    return this.http.post(this.BaseURL+'Login',formData).pipe(
    map(
      (res:any)=>{
        return res;
      }
    )
    )
  };
  

  register(formData:any){
    return this.http.post(this.BaseURL+'Register',formData).pipe(
     map(
       (res:any)=>{
         return res
       }
     )
    )
  }

  forgotPassword(formData:any){
    return this.http.put(this.BaseURL+'ForgotPassword',formData).pipe(
      map(
        (res)=>{
          return res
        }
        )
    )
  }

}
