import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpError,httpOptions ,apiUrl,httpHeader} from '../utils/utils';
import { catchError, Observable } from 'rxjs';
import { Filters, Movie, MovieResponse } from 'src/app/models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getAllMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(apiUrl+'/movies',httpOptions)
    .pipe(catchError(httpError));
  }
  getFilteredMovies(queryParams: string): Observable<MovieResponse[]> {
    return this.http.get<MovieResponse[]>(`${apiUrl}/movies?${queryParams}`,httpOptions)
    .pipe(catchError(httpError));
  }
  getMovieById(id: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/movies/${id}`,httpHeader)
    .pipe(catchError(httpError));
  }
  getMovieFilters(queryParams: string): Observable<Filters> {
    return this.http.get<Filters>(`${apiUrl}/movies/filters?${queryParams}`,httpHeader);
  }
  getUpcomingMovies(queryParams: string): Observable<MovieResponse[]> {
    return this.http.get<MovieResponse[]>(`${apiUrl}/movies/upcoming?${queryParams}`,httpHeader)
    .pipe(catchError(httpError));
  }
  UploadMovie(formData: FormData): Observable<any> {
    return this.http.post(`${apiUrl}/movies`, formData)
    .pipe(catchError(httpError));
  }
  getMovieNames(): Observable<any> {
    return this.http.get(`${apiUrl}/movies/names`,httpHeader)
    .pipe(catchError(httpError));
  }
  UpdateMovie(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${apiUrl}/movies/${id}`, formData)
    .pipe(catchError(httpError));
  }
}
