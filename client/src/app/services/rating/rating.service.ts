import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpError,apiUrl,httpOptions } from '../utils/utils';
import { catchError, Observable } from 'rxjs';
import { Interested, Rating, UserRating } from 'src/app/models/review';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  apiUrl:string=environment.apiUrl;
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  rateEntity(payload:Rating):Observable<Response>{
    return this.http.post<Response>(apiUrl+'/rating/add-rating',payload,httpOptions)
    .pipe(catchError(httpError));
  }
  fetchMovieReviews(movieId:string,page:number,limit:number):Observable<any>{
    return this.http.get<any>(`${apiUrl}/rating/movie/${movieId}?limit=${limit}&page=${page}`,httpOptions)
    .pipe(catchError(httpError));
  }
  fetchUserRating(userId:string,entityId:string):Observable<UserRating>{
    return this.http.get<UserRating>(`${apiUrl}/rating/user/${userId}/${entityId}`,httpOptions)
    .pipe(catchError(httpError));
  }
  showInterestInEntity(payload:Interested):Observable<Response>{
    return this.http.post<Response>(apiUrl+'/rating/interested',payload,httpOptions)
    .pipe(catchError(httpError));

  }
}
