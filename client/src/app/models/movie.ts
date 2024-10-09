export class Movie {
  name: string;
  description: string;
  duration: number;
  rating: number;
  ratedby: number;
  genre: string[];
  languages: string[];
  cast:string[];
  crew:string[];
  image_url: string;
  movie_rated:string;
  release_date: Date;   // To keep track of upcoming movies.
  likes: number = 0; 

  constructor(
    name: string,
    description: string,
    duration: number,
    release_date: Date,
    movie_rated:string='U',
    rating: number = 0,
    ratedby: number = 0,
    genre: string[] = [],
    languages: string[] = [],
    image_url: string = '',
    likes: number = 0,
    cast:string[] = [],
    crew:string[] = []
  ) {
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.rating = rating;
    this.ratedby = ratedby;
    this.genre = genre;
    this.languages = languages;
    this.image_url = image_url;
    this.movie_rated=movie_rated;
    this.release_date = release_date;
    this.likes = likes;
    this.cast=cast;
    this.crew=crew;
  }
}

export class Filters{
  languages: string[];
  genres: string[];
  formats: string[];
  constructor(languages: string[], genres: string[], formats: string[]){
    this.languages = languages;
    this.genres = genres;
    this.formats = formats;
  }
}

export interface MovieResponse {
  _id: string;
  name: string;
  image_url: string;
  genre: string[];
  movie_rated:string;
  ratedby?: number;
  rating?: number;
  likes?: number;
  release_date?: Date;
}


