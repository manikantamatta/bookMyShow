import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../components/auth/login/login.component';
import { AuthServiceService } from '../sharedservice/auth-service.service';
import { ToasterService } from '../sharedservice/toaster.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog,
    private authService: AuthServiceService,
    private toasterService:ToasterService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Clone the request and add the `withCredentials` option
    const clonedRequest = request.clone({
      withCredentials: true // Ensures cookies are included with the request
    });
    return next.handle(clonedRequest).pipe(
      catchError(err => {
        console.log(err);
        if (err.status === 401 && (err.error.message==='Invalid token'|| err.error.message==='Authentication token missing')) {
          console.log('Session expired');
          this.authService.signout();
          this.dialog.open(LoginComponent);
          this.toasterService.showInfo('Session Expired .Login again');
        }
        return throwError(err);
      })
    );
  }
}
