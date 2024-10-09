import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpError } from '../utils/utils';
import { catchError, Observable } from 'rxjs';
import { unifiedShows } from 'src/app/models/unifiedShows';
import { Events } from 'src/app/models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  apiUrl:string=environment.apiUrl;
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { }
  getFilteredEvent(queryParams: string): Observable<unifiedShows[]> {
    return this.http.get<unifiedShows[]>(`${this.apiUrl}/events?${queryParams}`,this.httpHeader)
    .pipe(catchError(httpError));
  }
  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/events/${id}`,this.httpHeader)
    .pipe(catchError(httpError));
  }
  getEventTicketInfo(id: string): Observable<any> {
    return this.http.get<Events>(`${this.apiUrl}/events/ticket/${id}`,this.httpHeader)
    .pipe(catchError(httpError));
  }
  addEvent(formData: FormData):Observable<any>{
    return this.http.post(this.apiUrl+'/events',formData)
    .pipe(catchError(httpError));
  }
}
