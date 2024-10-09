import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from 'src/app/services/search/search.service';
import { LocationService } from 'src/app/sharedservice/location.service';
import { searchResposne, SearchResults } from 'src/app/models/interfaces';
import { Subscription, Subject, of } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  arrMovies: SearchResults[] = [];
  arrCinemas: SearchResults[] = [];
  arrEvents: SearchResults[] = []; 
  hasData: boolean = false;
  loading: boolean = false;
  location: string = '';
  searchQuery: string = '';
  
  private locationSubscription: Subscription = new Subscription();
  private searchSubject: Subject<string> = new Subject<string>();
  private searchSubscription: Subscription = new Subscription();

  constructor(
    private searchService: SearchService, 
    private locationService: LocationService,
    private router: Router,
    private dialogRef: MatDialogRef<SearchComponent>,
  ) {}

  ngOnInit(): void {
    this.locationSubscription.add(
      this.locationService.cityName$.subscribe(city => {
        this.location = city || '';
        if (this.searchQuery.length >= 2) {
          this.searchSubject.next(this.searchQuery);
        } else {
          this.resetResults();
        }
      })
    );
    // Debonce the search query to avoid making too many requests
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300), 
      distinctUntilChanged(),
      switchMap(query => {
        if (query.length >= 2) {
          this.loading = true;
          return this.searchService.search(this.location, query);
        } else {
          this.resetResults();
          return of({ movies: [], cinemas: [], events: [] } as searchResposne);
        }
      })
    ).subscribe(
      (response: searchResposne) => {
        this.arrMovies = response.movies || [];
        this.arrCinemas = response.cinemas || [];
        this.arrEvents = response.events || [];
        this.checkDataAvailability();
        this.loading = false;
      },
      error => {
        console.error('Search failed', error);
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.locationSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value.trim();
    this.searchQuery = query;
    this.searchSubject.next(query); // Emit the search query
  }

  private checkDataAvailability(): void {
    this.hasData = this.arrMovies.length > 0 ||
                   this.arrCinemas.length > 0 ||
                   this.arrEvents.length > 0;
  }

  private resetResults(): void {
    this.arrMovies = [];
    this.arrCinemas = [];
    this.arrEvents = [];
    this.hasData = false;
  }

  navigateToDetails(type: 'movie' | 'cinema' | 'event', id: string): void {
    this.dialogRef.close(); 
    if(type === 'movie') {
      this.router.navigate([`/movies/${id}`]);
    } else if(type === 'cinema') {
      this.router.navigate([`/buyticketsByCinema/${id}`]);
    } else {
      this.router.navigate([`/events/${id}`]);
    }
  }
}