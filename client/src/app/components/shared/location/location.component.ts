import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  cities: string[] = ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad'];

  constructor(
    public dialogRef: MatDialogRef<LocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  selectCity(city: string) {
    this.dialogRef.close(city);
  }
  ngOnInit(): void {
    
  }

}
