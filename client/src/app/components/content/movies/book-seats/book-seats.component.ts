interface Booking {
  categoryId: number;
  rowId: number;
  seatName: string;
  seatId: number;
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowService } from 'src/app/services/show/show.service';
import { SelectSeatsNumberComponent } from '../dialog/select-seats-number/select-seats-number.component';
import { MatDialog } from '@angular/material/dialog';
import { BookingService } from 'src/app/services/booking/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from 'src/app/sharedservice/auth-service.service';


@Component({
  selector: 'app-book-seats',
  templateUrl: './book-seats.component.html',
  styleUrls: ['./book-seats.component.scss']
})

export class BookSeatsComponent implements OnInit {
  
  show: any = null;
  showId: string | null = null;
  selectedSeats: Set<string> = new Set(); 
  seatsmap: Map<string,number> = new Map();
  rowMap: Map<string,string> = new Map();
  requiredSeats: number = 2;
  noOfTickets: number = 2;
  payableAmount: number = 0;
  last_seat_number=0;
  row_number_tracker=0;
  seatOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 
  showPaymentGateway: boolean = false;
  Booking_details: Booking[] = [];
  user_id: string | null = null;
  
  constructor(private dialog: MatDialog,private showService: ShowService, private route: ActivatedRoute,
    private bookingService: BookingService,private _snackBar: MatSnackBar, private authService:AuthServiceService
  ) {}

  ngOnInit(): void {
    this.showId = this.route.snapshot.paramMap.get('id');
    this.openSeatSelectionDialog();
    this.authService.getUserId().subscribe((userId) => {
      this.user_id = userId;
      this.fetchShowInfo();
    });
    }

  fetchShowInfo(): void {
    if (this.showId) {
      this.showService.getShowById(this.showId).subscribe(response => {
        this.show = response;
      });
    }
  }

  getSeatStyle(seatStatus: string, categorynumber:number,rowIndex: number, seatIndex: number): any {
    const baseStyle = {
      'width': '30px',
      'height': '30px',
      'display': 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      'margin': '2px',
      'cursor': seatStatus === '0' ? 'pointer' : 'default',
    };
    const seatNumber = this.getSeatNumber(categorynumber,rowIndex, seatIndex);
    return seatStatus === '0' ? 
           { ...baseStyle, 'background-color': this.selectedSeats.has(seatNumber) ? 'green' : 'white', 'border': '1px solid green' } :
           seatStatus === '1' ? 
           { ...baseStyle, 'background-color': 'grey' } :
           seatStatus === '_' ? 
           { ...baseStyle, 'background-color': 'transparent', 'border': 'none', 'width': '30px', 'height': '30px' } : 
           {};
  }

  toggleSeat(seatStatus: string, categorynumber:number,rowIndex: number, seatIndex: number): void {
    if(seatStatus === '1' || seatStatus === '_'){return}
    if(this.requiredSeats==0){
      this.selectedSeats.clear();
      this.requiredSeats=this.noOfTickets;
      this.payableAmount=0;
    }
    var i = seatIndex;
    var rowSeats = this.show.seat_info[categorynumber].status[rowIndex];
    while (this.requiredSeats > 0 && rowSeats[i] == '0') {
      const seatNumber = this.getSeatNumber(categorynumber, rowIndex, i);
      if (this.selectedSeats.has(seatNumber)) {
        return;
      }
      this.selectedSeats.add(seatNumber);
      this.requiredSeats--;
      this.UpdateAmount(categorynumber, 1);
      i++;
    }
  }

  getSeatNumber(categorynumber:number,rowIndex: number, seatIndex: number): string {
    return `${this.getRowLabel(categorynumber)}${this.getRowLabel(rowIndex)}${seatIndex + 1}`;
  }

  getRowLabel(rowIndex: number): string {
    return String.fromCharCode(65 + rowIndex);
  }
  getRowNumber(rowIndex: string): number {
    return Number(rowIndex.charCodeAt(0)-65);
  }
  getRowName(categorynumber: number, rowIndex: number): string {
    const s = `${this.getRowLabel(categorynumber)}${this.getRowLabel(rowIndex)}`;
    
    if (this.rowMap.has(s)) {
      return this.rowMap.get(s) as string;
    }
    
    this.rowMap.set(s, this.getRowLabel(this.row_number_tracker));
    this.row_number_tracker += 1;
    return this.rowMap.get(s) as string;
  }
  getContinousSeatNumber(categorynumber:number,rowIndex: number, seatIndex: number): number {
    var s=`${this.getRowLabel(categorynumber)}${this.getRowLabel(rowIndex)}${seatIndex + 1}`;
    if(this.seatsmap.has(s)){
      return this.seatsmap.get(s) as number;
    }
    if(seatIndex==0){ this.last_seat_number=0};
    this.last_seat_number+=1;
    this.seatsmap.set(s,this.last_seat_number);
    return this.last_seat_number;
  }
  UpdateAmount(categorynumber:number,flag:number): void {
      var amount=0;
      if(flag){
        this.payableAmount+=this.show.seat_info[categorynumber].price;
      }else{
        this.payableAmount-=this.show.seat_info[categorynumber].price;
      }
    }
    bookSeats(): void {
        const booking:Booking[]=[];
        this.selectedSeats.forEach(seat => {
            
            const categoryId = this.getRowNumber(seat[0]);
            const rowId = this.getRowNumber(seat[1]);
            const seatNumber = this.seatsmap.get(seat);
            
            let seatId = parseInt(seat[2], 10);
            if (seat[3]) {
                seatId = seatId * 10 + parseInt(seat[3], 10);
            }
            seatId = seatId - 1;
            
            const rowName = this.getRowName(categoryId, rowId);
            const seatName = `${rowName}${seatNumber}`;
            
            const obj = { categoryId, rowId, seatName, seatId };
            booking.push(obj);
            
        });
        
        const bookingData={ userId: this.user_id||'', booking: booking };
    if (this.showId) {
        this.bookingService.VerifyBookingDetails(this.showId, bookingData).subscribe(
            response => {
                this.Booking_details=booking;
                this.showPaymentGateway = true;


            },
            error => {
                if (error.error.message === "One or more seats are already booked") {
                    this._snackBar.open('One or more seats are already booked', 'Close');
                } else {
                    this._snackBar.open('An error occurred during booking', 'Close');
                }
                this.selectedSeats.clear();
                this.requiredSeats = this.noOfTickets;
            }
        );
    }
  }
    openSeatSelectionDialog(): void {
      const dialogRef = this.dialog.open(SelectSeatsNumberComponent, {
        width: '500px',
        data: { currentSelectedNoSeats: this.noOfTickets }
      });
    
      dialogRef.afterClosed().subscribe((result: number) => {
        if (result !== undefined) {
          this.requiredSeats = result;
          this.selectedSeats.clear();
          this.noOfTickets = result;
          this.payableAmount=0;
        }
      });
    }
}

