import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { Router } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { LocationService } from 'src/app/sharedservice/location.service';
import { LocationComponent } from '../shared/location/location.component';
import { AuthServiceService } from 'src/app/sharedservice/auth-service.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  isOffcanvasOpen = false;
  location: string | null = null;
  userId: string | null = null;
  isLoggedIn: boolean = false;

  constructor(public dialog: MatDialog,private router: Router,private locationService:LocationService,
    private sharedAuthService:AuthServiceService
  ) {
    this.locationService.cityName$.subscribe(city => {
      this.location = city;
   });
   this.sharedAuthService.getUserId().subscribe((id: string | null) => {
    this.userId = id;
    this.isLoggedIn = !!this.userId;
  });
  }

  ngOnInit(): void {

  }

  toggleOffcanvas(event: Event): void {
    event.stopPropagation();
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
  }

  closeOffcanvas(): void {
    this.isOffcanvasOpen = false;
  }

  promptForCity(): void {
    const dialogRef = this.dialog.open(LocationComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationService.setCity(result);
      }
    });
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const offcanvas = document.querySelector('.offcanvas') as HTMLElement;
    const menuIcon = document.querySelector('.navbar-toggler-icon') as HTMLElement;
    const isClickInside = offcanvas.contains(target) || menuIcon.contains(target);

    if (!isClickInside) {
      this.closeOffcanvas();
    }
  }
  openAuthDialog() {
    const dialogConfig = this.dialog.open(AuthComponent, {
      width: this.getDialogWidth(),
      height: this.getDialogHeight(),
      maxWidth: '90vw', 
      maxHeight: '90vh', 
      panelClass: 'custom-dialog-container' 
    });
  }
  
  private getDialogWidth(): string {
    if (window.innerWidth <= 600) {
      return '90vw'; 
    } else if (window.innerWidth <= 960) {
      return '70vw'; 
    } else {
      return '50vw'; 
    }
  }
  
  private getDialogHeight(): string {
    if (window.innerHeight <= 600) {
      return '80vh'; 
    } else {
      return '60vh'; 
    }
  }
  openSearch() {
    this.dialog.open(SearchComponent, {
      width: '80vw',
      height: '80vh',
      panelClass: 'full-screen-dialog'
    });
  }
  signOut(): void {
    this.userId = null;
    this.isLoggedIn = false;
    this.router.navigate(['/']);
    this.sharedAuthService.signout();
  }

  
}
