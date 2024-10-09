import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-seats-number',
  templateUrl: './select-seats-number.component.html',
  styleUrls: ['./select-seats-number.component.scss']
})
export class SelectSeatsNumberComponent {

  seatOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Options for seat selection
  selectedSeats: number;

  constructor(
    public dialogRef: MatDialogRef<SelectSeatsNumberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentSelectedNoSeats: number }
  ) {
    this.selectedSeats = data.currentSelectedNoSeats;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectSeats(): void {
    this.dialogRef.close(this.selectedSeats);
  }
}
