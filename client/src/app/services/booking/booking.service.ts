import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpError } from '../utils/utils';
import { catchError, Observable } from 'rxjs';
import { BookingInterface, recentBookingResponse } from 'src/app/models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  apiUrl:string=environment.apiUrl;
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  VerifyBookingDetails(id:string,bookingDetails:any):Observable<any>{
    return this.http.post<any>(this.apiUrl+'/booking/'+id,bookingDetails,this.httpHeader)
  }
  BookTickets(bookingDetails:any):Observable<any>{
    return this.http.post<any>(this.apiUrl+'/booking',bookingDetails,this.httpHeader)
  }
  getRecentBookingsOfUser(id:string):Observable<any>{
    return this.http.get<any>(this.apiUrl+'/booking/recent/'+id,this.httpHeader)
  }
  getAllBookingsOfUser(id:string):Observable<BookingInterface[]>{
    return this.http.get<BookingInterface[]>(this.apiUrl+'/booking/user/'+id,this.httpHeader)
  }


}

// #FIXME- convert these response and request to correct types.
