import { ObjectId } from "mongodb"; 

export class Payment {
  user_id: ObjectId;
  show_id: ObjectId;
  seats: string[];
  amount: number;
  status: string;
  payment_time: Date;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    user_id: ObjectId,
    show_id: ObjectId,
    seats: string[],
    amount: number,
    status: string = 'pending',
    payment_time: Date = new Date()
  ) {
    this.user_id = user_id;
    this.show_id = show_id;
    this.seats = seats;
    this.amount = amount;
    this.status = status;
    this.payment_time = payment_time;
  }
}
  