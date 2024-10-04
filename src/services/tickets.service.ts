import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  //readonly BaseURL='https://localhost:7178/api/Tickets/'
  readonly BaseURL='https://moviebookingappapi-c4bvecbsaddafndu.eastus-01.azurewebsites.net/api/Tickets/'

  constructor(private http:HttpClient) { }

  bookTickets(data:any){
    return this.http.post(this.BaseURL+'booktickets',data).pipe(
      map(
        (res)=>{
          return res
        }
      )
    )
  }

  updateStatus(val1:any,val2:any){
    return this.http.put(this.BaseURL+val1+'/update/'+val2,null);
  }
  
  getBookingInfo(val1:any,val2:any){
    return this.http.get(this.BaseURL+val1+'/getBookingInfo/'+val2);
  }

  getTickets(val:any){
    return this.http.get(this.BaseURL+"getticketsbyuser/"+val).pipe(
      map(
        (res)=>{
          return res
        }
      )
    )
  }
  
}
