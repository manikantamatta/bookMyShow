import { Time } from "@angular/common";
import { ObjectId } from "mongodb"; 
export class Show {
    identity : string;
    content_id: ObjectId;
    location_id: number;
    start_time: Date;
    end_time: Date;
    date: Date;
    city: string;
    language: string;
    format: string;
    seat_info:Seat[];
  
    constructor(
      identity : string,
      content_id: ObjectId,
      location_id: number = 0,
      start_time: Date,
      end_time: Date,
      date: Date = new Date(),
      city: string = '',
      laguage: string = '',
      format: string = '',
      seat_info:Seat[]=[]
    ) {
      this.identity = identity;
      this.content_id = content_id;
      this.location_id = location_id;
      this.start_time = start_time;
      this.end_time = end_time;
      this.date = date;
      this.language = laguage;
      this.format = format;
      this.seat_info = seat_info;
      this.city = city;
    }
  }
export class Seat{
    type:string;
    status:string[]
    price:number;
    constructor(
        type:string='',
        status:string[]=[],
        price:number=0
    ){
        this.type=type;
        this.status=status;
        this.price=price;
    }
}

  