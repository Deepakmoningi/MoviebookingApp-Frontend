import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';     
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component'
import { ToastrModule } from 'ngx-toastr';
import { MoviesComponent } from './movies/movies.component';
import { TicketBookingComponent } from './ticket-booking/ticket-booking.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { MyticketsComponent } from './mytickets/mytickets.component'
import { AuthInterceptor } from './Auth/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    ForgotpasswordComponent,
    MoviesComponent,
    TicketBookingComponent,
    TicketdetailsComponent,
    MyticketsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      progressBar:true,
      timeOut:5000,
      positionClass:'custom-toast-position',
      preventDuplicates:true,
      closeButton:true
    }), 
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
