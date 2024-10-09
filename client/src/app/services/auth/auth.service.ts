import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { httpError,httpOptions,apiUrl } from '../utils/utils';
import { loginResponse } from 'src/app/models/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http: HttpClient) { }

  login(payload:any): Observable<loginResponse>{
    (payload);
    return this.http.post<loginResponse>(apiUrl+'/login',payload,httpOptions)
    .pipe(catchError(httpError));
  }
  loginBusiness(payload:any): Observable<Response>{
    return this.http.post<Response>(apiUrl+'/login/business',payload,httpOptions)
    .pipe(catchError(httpError));
  }

}
