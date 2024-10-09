import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking/booking.service';
import { AuthServiceService } from 'src/app/sharedservice/auth-service.service';
import { Router } from '@angular/router'; // Import the Router service
import { ToasterService } from 'src/app/sharedservice/toaster.service';

interface PaymentDetails {
  categoryName: string;
  numberOfSeats: number;
  showTime: Date;
  showLocation: string;
  totalAmount: number;
  show_id: string;
  show_name: string;
}

@Component({
  selector: 'app-payment-gateway-event',
  templateUrl: './payment-gateway-event.component.html',
  styleUrls: ['./payment-gateway-event.component.scss']
})
export class PaymentGatewayEventComponent implements OnInit {
  @Input() paymentDetails!: PaymentDetails;
  payment: any;
  booking: any;
  user_id: string | null = null;

  constructor(
    private bookingService: BookingService,
    private authService: AuthServiceService,
    private toasterService: ToasterService, // Inject the Toaster service
    private router: Router // Inject the Router service
  ) {}

  ngOnInit(): void {
    // Subscribe to the AuthService to get the user ID
    this.authService.getUserId().subscribe((userId) => {
      this.user_id = userId;
    });
  }

  proceedToPay(): void {
    if (!this.user_id) {
      console.error('User ID is not available');
      this.toasterService.showError('User ID is not available'); // Show error message
      return;
    }

    const seatsArray = this.paymentDetails.categoryName.split(',').map(seat => seat.trim());

    this.payment = {
      user_id: this.user_id, // Use dynamic user ID
      entity_id: this.paymentDetails.show_id,
      entity: 'EVE',
      seats: seatsArray,
      amount: this.paymentDetails.totalAmount,
      status: 'success',
      payment_time: new Date()
    };

    this.booking = {
      user_id: this.user_id, // Use dynamic user ID
      entity: 'EVE',
      entity_id: this.paymentDetails.show_id,
      amount: this.paymentDetails.totalAmount,
      seats: seatsArray,
      entity_name: this.paymentDetails.show_name,
      show_time: this.paymentDetails.showTime,
      location: this.paymentDetails.showLocation,
    };

    const payload = { Payment: this.payment, Booking: this.booking, seat_info: seatsArray };

    this.bookingService.BookTickets(payload).subscribe(
      (response) => {
        this.toasterService.showSuccess('Booking successful!'); // Show success message
        this.router.navigate(['/home']); // Navigate to home page
      },
      (error) => {
        console.error(error);
        this.toasterService.showError('Booking failed. Please try again.'); // Show error message
      }
    );
  }

  getSeats(): void {
    // Additional functionality for seat management can be added here
  }
}
