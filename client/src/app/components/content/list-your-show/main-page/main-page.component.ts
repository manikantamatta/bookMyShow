import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/services/business/business.service';
import { AuthServiceService } from 'src/app/sharedservice/auth-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  businessId: string | null = '';
  access: string[] = [];

  constructor(
    private authService: AuthServiceService,
    private businessService: BusinessService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getBusinessId().subscribe((response) => {
      this.businessId = response;
      this.fetchAccess();
    });
  }

  fetchAccess(): void {
    this.businessService.fetchAccess(this.businessId || '').subscribe((response) => {
      this.access = response.access;
    });
  }

  navigateToPage(entity: string): void {
    switch (entity) {
      case 'MOV':
        this.router.navigate(['/list-shows/movie']);
        break;
      case 'CIN':
        this.router.navigate(['/list-shows/cinema']);
        break;
      case 'SHO':
        this.router.navigate(['/list-shows/shows']);
        break;
      case 'EVE':
        this.router.navigate(['/list-shows/events']);
        break;
      default:
        break;
    }
  }

  reapplyPermission(): void {
    this.businessService.reapplyPermission(this.businessId || '').subscribe((response) => {
    });
  }
  signOut(): void {
    this.authService.signoutBusiness();
    this.router.navigate(['/list-shows']);
  }
}
