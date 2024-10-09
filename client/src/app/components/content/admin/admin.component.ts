import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BusinessService } from 'src/app/services/business/business.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthServiceService } from 'src/app/sharedservice/auth-service.service';
import { UserService } from 'src/app/services/user/user.service';
import { ToasterService } from 'src/app/sharedservice/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['username', 'name', 'mov', 'eve', 'sho', 'cin', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  access:boolean = false;
  userId: string|null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Pagination Variables
  page = 0;
  limit = 10;
  totalItems = 10;

  constructor(private businessService: BusinessService,
    private SharedAuthService: AuthServiceService,
    private userService: UserService,
    private toasterService: ToasterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.SharedAuthService.getUserId().subscribe(userId => {
      this.userId = userId;
      if(this.userId===null){
        this.toasterService.showError('You are not authorized to access this page');
        this.router.navigate(['/']);
      }
      this.userService.getUserById(this.userId||'').subscribe((data:any)=>{
        if(data.role === 'admin'){
          this.access = true;
          this.loadBusinesses();
        }
        else{
          this.access = false;
          this.toasterService.showError('You are not authorized to access this page');
          this.router.navigate(['/']);

        }
      },(error)=>{
        this.toasterService.showError('You are not authorized to access this page');
        this.router.navigate(['/']);
      })
    });


  }

  loadBusinesses(): void {
    this.businessService.fetchAllAppliedBusiness(this.page, this.limit).subscribe((response: any) => {
      this.dataSource.data = response; // Adjust if response structure is different
      this.dataSource.paginator = this.paginator;
    });
  }

  hasAccess(access: string[], type: string): boolean {
    return access.includes(type);
  }

  toggleAccess(businessId: string, type: string, event: any): void {
    const checked = event.checked;
    // Update the local data without calling the service immediately
    this.dataSource.data = this.dataSource.data.map((business: any) => {
      if (business._id === businessId) {
        const updatedAccess = checked 
          ? [...business.access, type]
          : business.access.filter((accessType: string) => accessType !== type);
        return { ...business, access: updatedAccess };
      }
      return business;
    });
  }

  updateAccess(businessId: string): void {
    const business = this.dataSource.data.find((business: any) => business._id === businessId);
    if (business) {
      this.businessService.updateBusinessAccess(businessId, business.access).subscribe(() => {
        this.toasterService.showSuccess('Access updated successfully');
      }, error => {
        this.toasterService.showError('Failed to update access');
      });
    }
  }

  // Handle pagination changes
  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.loadBusinesses();
  }
}
