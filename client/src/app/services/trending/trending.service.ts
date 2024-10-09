import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpError,httpOptions ,apiUrl,httpHeader} from '../utils/utils';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  constructor(private http: HttpClient) { }

  getTrendingMovies():Observable<any[]>{
    return this.http.get<any[]>(apiUrl+'/trending',httpOptions)
    .pipe(catchError(httpError));
  }
}
