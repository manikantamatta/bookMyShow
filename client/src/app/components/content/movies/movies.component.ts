import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Filters, MovieResponse } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie/movie.service';
import { LocationService } from 'src/app/sharedservice/location.service';
import { Language, Genre, Format } from 'src/app/constants/filters';
import { Subscription, combineLatest } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  location: string | null = null;
  movies: MovieResponse[] = [];
  filteredMovies: MovieResponse[] = [];
  selectedGenres: string[] = [];
  selectedLanguages: string[] = [];
  selectedFormat: string[] = [];
  genres: string[] = Genre;
  availableLanguages: string[] = Language;
  availableFormats: string[] = Format;
  viewMode: string = 'current';
  private initialLoad = true;
  backendurl: string = 'http://localhost:3000/';
  private subscriptions: Subscription = new Subscription();

  isDropdownOpen: { [key: string]: boolean } = {
    language: true,
    genre: false,
    format: false
  };

  constructor(
    private movieService: MovieService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      combineLatest([
        this.locationService.cityName$,
        this.route.queryParams
      ]).pipe(
        tap(([city, params]) => {
          this.location = city;
          if (this.initialLoad) {
            this.initialLoad = false;
            this.initializeFiltersFromQueryParams(params);
            
          }
        }),
        switchMap(() => this.fetchMovies())
      ).subscribe()
    );
    this.fetchFilters();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private fetchMovies() {
    const queryParams = this.buildQueryParams();
    const movieObservable = this.viewMode === 'current'
      ? this.movieService.getFilteredMovies(queryParams)
      : this.movieService.getUpcomingMovies(queryParams);

    return movieObservable.pipe(
      tap(movies => {
        this.movies = movies;
        this.filteredMovies = movies;
      })
    );
  }

  private fetchFilters(): void {
    const params = this.buildQueryParams();
    this.movieService.getMovieFilters(params).subscribe({
      next: (response: Filters) => {
        this.genres = response.genres;
        this.availableLanguages = response.languages;
        this.availableFormats = response.formats;
      },
      error: (err) => console.error('Error fetching filters', err)
    });
  }

  private setStaticFilters(): void {
    this.genres = Genre;
    this.availableLanguages = Language;
    this.availableFormats = Format;
  }

  private initializeFiltersFromQueryParams(params: any): void {
    this.selectedLanguages = params['languages'] ? params['languages'].split(',') : [];
    this.selectedGenres = params['genres'] ? params['genres'].split(',') : [];
    this.selectedFormat = params['formats'] ? params['formats'].split(',') : [];
  }

  onFilterChange(type: string, value: string): void {
    const selectedArray = this.getSelectedArray(type);
    const isSelected = selectedArray.includes(value);
    this.updateSelectedItems(value, selectedArray, !isSelected);
  }

  private getSelectedArray(type: string): string[] {
    switch (type) {
      case 'genre':
        return this.selectedGenres;
      case 'language':
        return this.selectedLanguages;
      case 'format':
        return this.selectedFormat;
      default:
        return [];
    }
  }

  private updateSelectedItems(value: string, selectedArray: string[], shouldSelect: boolean): void {
    if (shouldSelect) {
      selectedArray.push(value);
    } else {
      const index = selectedArray.indexOf(value);
      if (index > -1) {
        selectedArray.splice(index, 1);
      }
    }
  }

  applyFilters(): void {
    const queryParams: Params = this.buildQueryParamsObject();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });

    this.fetchMovies().subscribe();
  }

  private buildQueryParamsObject(): Params {
    const queryParams: Params = {};

    queryParams['languages'] = this.selectedLanguages.length ? this.selectedLanguages.join(',') : null;
    queryParams['genres'] = this.selectedGenres.length ? this.selectedGenres.join(',') : null;
    queryParams['formats'] = this.selectedFormat.length ? this.selectedFormat.join(',') : null;

    return queryParams;
  }

  private buildQueryParams(): string {
    const params: string[] = [];

    if (this.location) {
      params.push(`location=${this.location}`);
    }
    if (this.selectedLanguages.length) {
      params.push(`languages=${this.selectedLanguages.join('|')}`);
    }
    if (this.selectedGenres.length) {
      params.push(`genre=${this.selectedGenres.join('|')}`);
    }
    if (this.selectedFormat.length) {
      params.push(`format=${this.selectedFormat.join('|')}`);
    }

    return params.join('&');
  }

  clearFilter(type: string): void {
    switch (type) {
      case 'genre':
        this.selectedGenres = [];
        break;
      case 'language':
        this.selectedLanguages = [];
        break;
      case 'format':
        this.selectedFormat = [];
        break;
    }
    this.applyFilters();
  }

  getimageurl(movieurl: string): string {
    return `${this.backendurl}${movieurl}`;
  }

  toggleDropdown(type: string): void {
    this.isDropdownOpen[type] = !this.isDropdownOpen[type];
  }

  resetAllFilters(): void {
    this.selectedGenres = [];
    this.selectedLanguages = [];
    this.selectedFormat = [];
    this.applyFilters();
  }

  fetchMovieDetails(movie: any): void {
    this.router.navigate([`/movies/${movie._id}`]);
  }

  changeViewMode(mode: string): void {
    this.viewMode = mode;
    if (mode === 'upcoming') {
      this.setStaticFilters();
    } else {
      this.fetchFilters();
    }
    this.fetchMovies().subscribe();
  }

  browseByCinema(): void {
    this.router.navigate(['movies/cinemas']);
  }
}