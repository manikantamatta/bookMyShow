export class Cinema {
    id: string;
    name: string;
    location: Address;
    city: string;
    screens: number;
    food_service: boolean;
  
    constructor(
      id: string,
      name: string,
      city: string,
      screens: number,
      location: Address=new Address(),
      food_service: boolean=false,
    ) {
      this.id = id;
      this.name = name;
      this.location = location;
      this.screens = screens;
      this.city = city;
      this.food_service = food_service;
    }
  }

  export class Address{
    house_no: string;
    street: string;
    area: string;
    pincode: string;
  
    constructor(
      house_no: string='',
      street: string='',
      area: string='',
      pincode: string=''
    ) {
      this.street = street;
      this.pincode = pincode;
      this.area = area;
      this.house_no = house_no;
    }
  }

  export interface CinemaDetails{
    _id: string;
    name: string;
    city: string;
    location:{
      house_no: string;
      street: string;
      area: string;
      pincode: string;
      _id:string;
    };
  }
export interface CinemaResponse {
  cinema: CinemaDetails[];
  totalCinemas: number;
}
  