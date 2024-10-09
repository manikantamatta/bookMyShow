import { ObjectId } from 'mongodb';

export class Booking {
  user_id: ObjectId;
  show_id: ObjectId;
  transaction_id: ObjectId;
  amount: number;
  seats: string[];

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    user_id: ObjectId,
    show_id: ObjectId,
    transaction_id: ObjectId,
    amount: number,
    seats: string[]
  ) {
    this.user_id = user_id;
    this.show_id = show_id;
    this.transaction_id = transaction_id;
    this.amount = amount;
    this.seats = seats;
  }
}

export interface recentBookingResponse{
  userId: ObjectId;
  last_bookings: BookingInterface[];
}

export interface BookingInterface {
  entity: string;
  entity_id: string;
  entity_name: string;
  location: string;
  seats: string[];
  food: FoodItem[];
  amount: number;
  show_time: Date;
}

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
export interface BookingDetails {
  categoryId: number;
  rowId: number;
  seatName: string;
  seatId: number;
}

export interface PaymentDetails {
  user_id: string;
  show_id: string;
  identity: string;
  seats: string[];
  amount: number;
  status: string;
  payment_time: Date;
}





