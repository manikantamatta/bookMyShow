import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl, Validators } from '@angular/forms';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
import { BusinessService } from 'src/app/services/business/business.service';
import { AuthServiceService } from 'src/app/sharedservice/auth-service.service';
import { ToasterService } from 'src/app/sharedservice/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cinema',
  templateUrl: './list-cinema.component.html',
  styleUrls: ['./list-cinema.component.scss']
})
export class ListCinemaComponent implements OnInit {
  cinemaForm: FormGroup;
  Business: any;
  BusinessId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private cinemaService: CinemaService,
    private businessService: BusinessService,
    private authService: AuthServiceService,
    private toasterService: ToasterService,
    private router: Router
  ) {
    // Initialize the form with validators
    this.cinemaForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      house_no: ['', Validators.required],
      street: ['', Validators.required],
      area: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]], // Assuming pincode is a 6-digit number
      screens: [0, [Validators.required, Validators.min(1)]],
      food_service: [false],
      seating_arrangement: this.fb.array([], Validators.required) // Ensure at least one seating arrangement
    });
  }

  ngOnInit(): void {
    // Fetch the BusinessId from the AuthService
    this.authService.getBusinessId().subscribe((userId) => {
      this.BusinessId = userId;
      // Fetch Business details using the fetched BusinessId
      this.businessService.fetchBusinessById(this.BusinessId || '').subscribe((data) => {
        this.Business = data;
      });
    });
  }

  // Getter for the seating arrangements FormArray
  get seating_arrangement(): FormArray {
    return this.cinemaForm.get('seating_arrangement') as FormArray;
  }

  // Getter for seats FormArray
  getSeats(arrangement: AbstractControl): FormArray {
    return arrangement.get('seats') as FormArray;
  }

  // Getter for status FormArray within a seat
  getStatus(seat: AbstractControl): FormArray {
    return seat.get('status') as FormArray;
  }

  // Method to add a new seat to a specific seating arrangement
  addSeat(arrangement: AbstractControl): void {
    const seats = this.getSeats(arrangement);
    const seat = this.fb.group({
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]], // Price validation
      status: this.fb.array([]) // Initialize status as an empty FormArray
    });

    seats.push(seat);
  }

  // Method to remove a seat at a specific index
  removeSeat(arrangement: AbstractControl, index: number): void {
    const seats = this.getSeats(arrangement);
    seats.removeAt(index);
  }

  // Method to add a new status to a specific seat
  addStatus(seat: AbstractControl): void {
    const status = this.getStatus(seat);
    status.push(this.fb.control('', Validators.required)); // Add an empty string or default value with validation
  }

  // Method to remove a status at a specific index
  removeStatus(seat: AbstractControl, index: number): void {
    const status = this.getStatus(seat);
    status.removeAt(index);
  }

  // Method to add a new seating arrangement
  addNewSeatingArrangement(): void {
    const seatingArrangement = this.fb.group({
      screens_no: ['', Validators.required],
      seats: this.fb.array([]) // Initialize seats as an empty FormArray
    });

    // Add the new seating arrangement to the FormArray
    this.seating_arrangement.push(seatingArrangement);
  }

  // Method to remove a seating arrangement at a specific index
  removeSeatingArrangement(index: number): void {
    this.seating_arrangement.removeAt(index);
  }

  // Method to handle form submission
  submit(cinemaForm: FormGroup): void {
    if (cinemaForm.valid) {
      // Construct the location object
      const location = {
        house_no: cinemaForm.get('house_no')?.value,
        street: cinemaForm.get('street')?.value,
        area: cinemaForm.get('area')?.value,
        pincode: cinemaForm.get('pincode')?.value
      };
      const seatingArrangements = this.seating_arrangement.value.map((arrangement: any) => {
        return {
          ...arrangement,
          screens_no: typeof arrangement.screens_no === 'string'
            ? arrangement.screens_no.split(',').map((screen: string) => screen.trim())
            : arrangement.screens_no
        };
      });

      // Construct the final cinema data with the location object
      const cinemaData = {
        ...cinemaForm.value,
        location,
        seating_arrangement: seatingArrangements,
        house_no: undefined, // Remove redundant fields
        street: undefined,
        area: undefined,
        pincode: undefined
      };

      // Call the service to submit the data
      this.cinemaService.AddCinema(cinemaData).subscribe(
        (response: any) => {
          // Add the cinema ID to the Business entity
          this.Business.Cinitems.push({id: response._id, name: response.name});
          this.businessService.updateBusiness(this.BusinessId || '', this.Business).subscribe((data) => {
            // Show a success message and navigate to the home page
            this.toasterService.showSuccess('Cinema added successfully!');
            this.router.navigate(['list-shows/home']);
          });
        },
        (error: any) => {
          console.error('Failed to add cinema:', error);
          this.toasterService.showError('Failed to add cinema. Please try again.');
        }
      );
    } else {

    }
  }

  // Method to mark all controls as touched to show validation errors
  markAllAsTouched(formGroup: FormGroup): void {
    formGroup.markAllAsTouched();
  }
}
