import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export function httpError(error: HttpErrorResponse) {
    let msg = '';
    let errorCode = error.status;
    
    if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        msg = error.error.message;
    } else {
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(msg); 
    
    return throwError(() => ({ errorCode, msg }));
}

export const apiUrl: string = environment.apiUrl;

export const httpHeader = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export const httpOptions = {
  headers: httpHeader.headers,
  withCredentials: true
};
