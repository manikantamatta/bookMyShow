import { Injectable } from '@angular/core';
import { LocationComponent } from '../components/shared/location/location.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private cityNameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    cityName$: Observable<string | null> = this.cityNameSubject.asObservable();

  constructor(private dialog: MatDialog) {
    const storedCity = localStorage.getItem('userCity');
    if (storedCity) {
      this.cityNameSubject.next(storedCity);
    } else {
      this.promptForCity();
    }
  }

  setCity(city: string): void {
    this.cityNameSubject.next(city);
    localStorage.setItem('userCity', city);
  }

  getCity(): string | null {
    return this.cityNameSubject.value;
  }

  promptForCity(): void {
    const dialogRef = this.dialog.open(LocationComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setCity(result);
      }
    });
  }
}
