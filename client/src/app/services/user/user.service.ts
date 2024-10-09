import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpError,apiUrl, } from '../utils/utils';
import { catchError, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { loginResponse } from 'src/app/models/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string=environment.apiUrl;
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  httpOptions ={
    headers: this.httpHeader.headers,
    withCredentials:true
  }
  constructor(private http: HttpClient) { }

  register(payload:User):Observable<loginResponse>{
    return this.http.post<loginResponse>(this.apiUrl+'/users',payload,this.httpHeader)
    .pipe(catchError(httpError));;
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`,this.httpOptions)
    .pipe(catchError(httpError));
  }
  updateUserById(id: string, payload: User): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/users/${id}`, payload, this.httpHeader)
    .pipe(catchError(httpError));
  }
}
