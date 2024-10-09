// src/app/services/movie-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie/movie.service';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {
  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  movies$ = this.moviesSubject.asObservable();

  constructor(private movieService: MovieService) {
    this.loadMovies();
  }

  private loadMovies(): void {
    this.movieService.getAllMovies().subscribe(movies => {
      this.moviesSubject.next(movies);
    });
  }
}
