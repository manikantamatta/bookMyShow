import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingInterface, recentBookingResponse } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking/booking.service';
import { AuthServiceService } from 'src/app/sharedservice/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit, OnDestroy {
  recentOrders: BookingInterface[] = [];
  allOrders: BookingInterface[] = [];
  private subscriptions: Subscription = new Subscription();
  isLoadingAllOrders: boolean = false;
  userId: string |null = '';

  constructor(
    private bookingService: BookingService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    // Get the logged-in user ID
    this.subscriptions.add(
      this.authService.getUserId().subscribe((id) => {
        this.userId = id;
        this.fetchRecentOrders();
      })
    );
  }

  fetchRecentOrders(): void {
    // Fetch recent bookings
    this.subscriptions.add(
      this.bookingService.getRecentBookingsOfUser(this.userId||'').subscribe((data:any) => {
        if ((data)) {
          this.recentOrders = data[0].last_bookings;
        }
      })
    );
  }

  fetchAllOrders(): void {
    if (this.allOrders.length === 0 && !this.isLoadingAllOrders) {
      this.isLoadingAllOrders = true;
      // Fetch all bookings
      this.subscriptions.add(
        this.bookingService.getAllBookingsOfUser(this.userId||'').subscribe(
          (data:BookingInterface[]) => {
            this.allOrders = data;
            this.isLoadingAllOrders = false;
          },
          (error) => {
            console.error('Failed to load all orders', error);
            this.isLoadingAllOrders = false;
          }
        )
      );
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.subscriptions.unsubscribe();
  }
}

