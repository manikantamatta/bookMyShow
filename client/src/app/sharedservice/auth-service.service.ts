import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// AuthServiceService handles user and business authentication details.
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  // BehaviorSubject to track the current user ID.
  private userIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  // BehaviorSubject to track the current business ID.
  private BusinessIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() { }

  // Retrieve the user ID from local storage and update the BehaviorSubject.
  getUserId(): Observable<string | null> {
    const localId = localStorage.getItem('userId');
    if (localId) {
      this.userIdSubject.next(localId);
    }
    return this.userIdSubject.asObservable();
  }
  checkUserId():void{
    const localId = localStorage.getItem('userId');
    if (localId) {
      this.userIdSubject.next(localId);
    }
  }
  checkBusinessId():void{
    const localId = localStorage.getItem('businessId');
    if (localId) {
      this.BusinessIdSubject.next(localId);
    }
  }
  isUserLoggedIn(): boolean {
    return this.userIdSubject.value !== null;
  }
  isBusinessLoggedIn(): boolean {
    return this.BusinessIdSubject.value!==null;
  }

  // Set the user ID both in the BehaviorSubject and local storage.
  setUserId(userId: string): void {
    this.userIdSubject.next(userId);
    localStorage.setItem('userId', userId);
  }
  getCurrentBusinessId(): string | null {
    this.checkBusinessId();
    return this.BusinessIdSubject.value;
  }
  getCurrentUserId(): string | null {
    this.checkUserId();
    return this.userIdSubject.value;
  }

  signout(): void {
    localStorage.removeItem('userId');
    this.clearCookie('jwtToken');
    this.userIdSubject.next(null);
  }

  private clearCookie(name: string): void {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  // Retrieve the business ID from local storage and update the BehaviorSubject.
  getBusinessId(): Observable<string | null> {
    const localId = localStorage.getItem('businessId');
    if (localId) {
      this.BusinessIdSubject.next(localId);
    }
    return this.BusinessIdSubject.asObservable();
  }

  // Set the business ID both in the BehaviorSubject and local storage.
  setBusinessId(businessId: string): void {
    this.BusinessIdSubject.next(businessId);
    localStorage.setItem('businessId', businessId);
  }

  signoutBusiness(): void {
    localStorage.removeItem('businessId');
    this.clearCookie('jwtTokenBusiness');
    this.BusinessIdSubject.next(null);
  }
}

