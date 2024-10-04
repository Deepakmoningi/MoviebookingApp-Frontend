import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TicketsService } from 'src/services/tickets.service';

@Component({
  selector: 'app-mytickets',
  templateUrl: './mytickets.component.html',
  styleUrls: ['./mytickets.component.css']
})
export class MyticketsComponent implements OnInit {

  constructor(private ticketService:TicketsService, private toastr:ToastrService) { }
  ticketsByuser:any=[];

  ngOnInit(): void {
    this.getTickets();
  }
  
  getTickets(){
    this.ticketService.getTickets(localStorage.getItem('username'))
    .subscribe({
     next: (res)=>{
        this.ticketsByuser=res;
      },
      error:(err)=>{
        this.toastr.error(err?.error.message)
      }
    }
    )
  }

}
