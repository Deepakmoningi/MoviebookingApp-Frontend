import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  //readonly BaseURL='https://localhost:7178/api/Movies/'
  readonly BaseURL='https://moviebookingappapi-c4bvecbsaddafndu.eastus-01.azurewebsites.net/api/Movies/'
  constructor(private http:HttpClient) { }

  getAllMovies(){
    return this.http.get<any>(this.BaseURL+'all');
  }

  getMovieByName(val:any){
    return this.http.get<any>(this.BaseURL+'search/'+val);
  }

  deleteMovie(val1:any,val2:any){
    return this.http.delete(this.BaseURL+val1+'/delete/'+val2).pipe(
      map(
        (res)=>{
          return res
        }
      )
    )
  }
}
