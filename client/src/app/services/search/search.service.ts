import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { searchResposne } from 'src/app/models/interfaces';
import { httpError, apiUrl, httpOptions } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  /**
   * Performs a search based on city and query parameters.
   * @param city The city to search within.
   * @param query The search query.
   * @returns An observable of the search results.
   */
  search(city: string, query: string): Observable<searchResposne> {
    const url = `${apiUrl}/search`;
    
    return this.http.get<searchResposne>(url, {
      ...httpOptions,
      params: {
        city,
        search: query
      }
    }).pipe(
      catchError(httpError)
    );
  }
}
