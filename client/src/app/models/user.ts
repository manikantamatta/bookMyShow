export class User {
  username: string;
  mobile_no: string;
  password: string;
  role: string;
  address: Address;
  personal_details: PersonalDetails;
  created_at: Date;
  booking_ids: string[];

  constructor(
    username: string,
    mobile_no: string,
    password: string,
    role: string='user',
    address: Address = new Address(),
    personal_details: PersonalDetails = new PersonalDetails(),
    created_at: Date = new Date(),
    booking_ids: string[] = []
  ) {
    this.username = username;
    this.mobile_no = mobile_no;
    this.password = password;
    this.role = role;
    this.address = address;
    this.personal_details = personal_details;
    this.created_at = created_at;
    this.booking_ids = booking_ids;
  }
}
export class Address {
    houseno: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  
    constructor(
      houseno: string = '',
      street: string = '',
      city: string = '',
      state: string = '',
      pincode: string = ''
    ) {
      this.houseno = houseno;
      this.street = street;
      this.city = city;
      this.state = state;
      this.pincode = pincode;
    }
  }
export class PersonalDetails {
    name: string;
    dob: Date;
  
    constructor(name: string = '', dob: Date = new Date()) {
      this.name = name;
      this.dob = dob;
    }
  }
    