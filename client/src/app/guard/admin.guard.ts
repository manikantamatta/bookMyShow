import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthServiceService } from '../sharedservice/auth-service.service';
import { BusinessService } from '../services/business/business.service';
import { ToasterService } from '../sharedservice/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService:AuthServiceService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const userId = this.authService.getCurrentUserId();
      return userId !== null;
  }
  
}
@Injectable({
  providedIn: 'root'  
})
export class BusinessGuard implements CanActivate {
  constructor(
    private authService:AuthServiceService,

  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const businessId = this.authService.getCurrentBusinessId();
      return businessId !== null;
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class BusinessAccessGuard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    private BusinessService: BusinessService,
    private ToasterService: ToasterService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const businessId = this.authService.getCurrentBusinessId();
    const entity = route.data['entity'];

    return this.BusinessService.checkBusinessAccess(businessId || '', entity).pipe(
      map((data: any) => {
        if (data.status === true) {
          return true;
        } else {
          this.ToasterService.showError("You don't have access to this page");
          return false;
        }
      }),
      catchError((error) => {
        this.ToasterService.showError("Error checking access");
        return of(false);
      })
    );
  }
}



