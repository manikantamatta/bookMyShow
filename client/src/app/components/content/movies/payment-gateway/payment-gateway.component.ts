import { Component, Input, OnInit } from '@angular/core';
import { Cinema } from 'src/app/models/cinema';
import { BookingService } from 'src/app/services/booking/booking.service';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
import { FOOD_SERVICES } from 'src/app/constants/food_service';
import { AuthServiceService } from 'src/app/sharedservice/auth-service.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ToasterService } from 'src/app/sharedservice/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {
  @Input() Show: any;
  @Input() Booking: any;
  @Input() TotalAmount: number = 0;
  
  cinema: Cinema = new Cinema('', '', '', 0);
  payment: any;
  booking: any;
  seat_info: any;
  Movie: any;
  foodServices = FOOD_SERVICES;
  selectedCategory: string = 'All';
  filteredFoodServices: any[] = [];
  selectedItems: any[] = [];
  foodDetails: string = '';
  userId: string | null = null;
  itemQuantities: { [key: string]: number } = {}; 
  showFoodOptions: boolean = false; // Track if food options should be shown

  constructor(
    private cinemaService: CinemaService, 
    private bookingService: BookingService,
    private authService: AuthServiceService,
    private movieService: MovieService,
    private toasterService: ToasterService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.cinemaService.getCinemaById(this.Show.cinema_id).subscribe((response) => {
      this.cinema = response;
      this.showFoodOptions = this.cinema.food_service; // Show food options based on cinema's food_service
      this.filterFoodServices();
    });

    this.authService.getUserId().subscribe((userId) => {
      this.userId = userId;
    });
    this.movieService.getMovieById(this.Show.movie_id).subscribe((response) => {
      this.Movie = response;
    });
  }

  makePayment(): void {
    const seats: string[] = this.Booking.map((element: any) => element.seatName);
    
    this.payment = {
      user_id: this.userId || '', 
      entity_id: this.Show._id,
      entity: 'MOV',
      seats,
      amount: this.TotalAmount,
      status: 'success',
      payment_time: new Date()
    };

    this.booking = {
      user_id: this.userId || '',
      entity_id: this.Show._id,
      entity: 'MOV',
      entity_name: this.Movie.name,
      location: this.cinema.location.house_no + ', ' + this.cinema.location.street + ', ' + this.cinema.location.area + ', ' + this.cinema.location.pincode,
      amount: this.TotalAmount,
      show_time: this.Show.start_time,
      seats,
      food: this.selectedItems
    };

    this.updateSeats();
    const payload = { Payment: this.payment, Booking: this.booking, seat_info: this.Show.seat_info };
    this.bookingService.BookTickets(payload).subscribe(
      (response) => {
        this.toasterService.showSuccess('Payment successful!'); // Show success message
        this.router.navigate(['/home']); // Navigate to home page
      },
      (error) => {
        this.toasterService.showError('Payment failed!'); // Handle errors
        console.error('Payment error:', error);
      }
    );
  }

  updateSeats(): void {
    this.seat_info = this.Show.seat_info;
    this.Booking.forEach((element: any) => {
      let rowStatus = this.seat_info[element.categoryId].status[element.rowId];
      let rowStatusArray = rowStatus.split('');
      rowStatusArray[element.seatId] = '1';
      this.seat_info[element.categoryId].status[element.rowId] = rowStatusArray.join('');
    });
  }

  filterFoodServices(): void {
    if (this.selectedCategory === 'All') {
      this.filteredFoodServices = this.foodServices.flatMap(service =>
        service.items.map(item => ({
          ...item,
          image: service.imgpath,
          quantity: this.itemQuantities[item.id] || 0
        }))
      );
    } else {
      const service = this.foodServices.find(service => service.category === this.selectedCategory);
      this.filteredFoodServices = service ? 
        service.items.map(item => ({
          ...item,
          image: service.imgpath,
          quantity: this.itemQuantities[item.id] || 0
        })) : [];
    }
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterFoodServices();
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    this.itemQuantities[item.id] = item.quantity;
    this.TotalAmount += item.price;
    this.updateSelectedItems(item);
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 0) {
      item.quantity--;
      this.itemQuantities[item.id] = item.quantity;
      this.TotalAmount -= item.price;
      this.updateSelectedItems(item);
    }
  }

  updateSelectedItems(item: any): void {
    const existingItem = this.selectedItems.find(i => i.id === item.id);
    if (existingItem) {
      if (item.quantity === 0) {
        this.selectedItems = this.selectedItems.filter(i => i.id !== item.id);
      } else {
        existingItem.quantity = item.quantity;
      }
    } else {
      if (item.quantity > 0) {
        this.selectedItems.push({ id: item.id, name: item.name, quantity: item.quantity, price: item.price });
      }
    }
    this.updateFoodDetails();
  }

  updateFoodDetails(): void {
    this.foodDetails = this.selectedItems.map(item => `${item.quantity} ${item.name}`).join(', ');
  }
}
