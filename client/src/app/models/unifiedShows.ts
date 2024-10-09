import { ObjectId } from "mongodb";

export class unifiedShows{
    identity: string;
    eventId: ObjectId
    name: string;
    date: Date;
    time: Date;
    duration: number;
    location: Address;
    city: string;
    category: string;
    language: string;
    image_url: string;
    constructor(
        identity: string,
        name: string,
        eventId: ObjectId,
        date: Date,
        time: Date,
        duration: number,
        location: Address,
        city: string,
        category: string='',
        language: string='',
        image_url: string=''
    ){
        this.identity = identity;
        this.name = name;
        this.eventId = eventId;
        this.duration=duration;
        this.date = date;
        this.time = time;
        this.location = location;
        this.city = city;
        this.duration = duration;
        this.category = category;
        this.language = language;
        this.image_url = image_url;
    }
}

export class Address{
    Houseno: string;
    street: string;
    city: string;
    state: string;
    pincode: number;
    country: string;
    constructor(
        Houseno: string,
        street: string,
        city: string,
        state: string,
        pincode: number,
        country: string
    ){
        this.Houseno = Houseno;
        this.street = street;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
        this.country = country;
    }
}