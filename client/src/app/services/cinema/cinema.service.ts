import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpError } from '../utils/utils';
import { catchError, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CinemaResponse } from 'src/app/models/cinema';
@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  apiUrl:string=environment.apiUrl;
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getAllCinemasByLocation(city:string,page:number,limit:number):Observable<CinemaResponse>{
    return this.http.get<CinemaResponse>(`${this.apiUrl}/cinemas/${city}?page=${page}&limit=${limit}`, this.httpHeader)
    .pipe(catchError(httpError));
  }
  getCinemaById(id:string):Observable<any>{
    return this.http.get<any>(this.apiUrl+'/cinemas/cinemaDetails/'+id,this.httpHeader)
    .pipe(catchError(httpError));
  }
  getMoviesByCinemaId(id:string):Observable<any>{
    return this.http.get<any>(this.apiUrl+'/cinemas/get-shows-by-cinema/'+id,this.httpHeader)
    .pipe(catchError(httpError));
  }
  AddCinema(cinema:any):Observable<any>{
    return this.http.post(this.apiUrl+'/cinemas',cinema,this.httpHeader)
    .pipe(catchError(httpError));
  }
}
