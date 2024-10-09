import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ShowService } from 'src/app/services/show/show.service';
import { LocationService } from 'src/app/sharedservice/location.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Show {
  _id: string;
  start_time: string;
  seat_info?: { type: string; status: string[]; price: number }[];
}

interface Cinema {
  cinema_id: string;
  cinema_name: string;
  location: {
    house_no: string;
    street: string;
    area: string;
    pincode: string;
  };
  food_service: boolean;
  shows: Show[];
}

interface DateGroup {
  date: string;
  cinemas: Cinema[];
}

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss'],
})
export class ShowsComponent implements OnInit, OnDestroy {
  format: string = '2D';
  movieName: string = '';
  genre: string = '';
  languages: string[] = ['Hindi', 'English', 'Spanish', 'French'];
  formats: string[] = ['2D', '3D', 'IMAX'];
  selectedLanguage: string = 'Hindi';
  queryParamLanguage: string = 'Hindi';
  queryParamFormat: string = '2D';
  queryParamLocation: string = '';
  selectedDateIndex: number = 0;
  location: string | null = '';
  movieID: string | null = null;
  dateGroups: DateGroup[] = [];
  selectedDateGroup: DateGroup | null = null;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private showService: ShowService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieID = this.route.snapshot.paramMap.get('id');
    this.subscriptions.add(
      this.route.queryParams.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe((params) => {
        const newFormat = params['format'] || '2D';
        const newLocation = params['location'] || 'Bangalore';
        const newLanguage = params['language'] || 'Hindi';

        if (this.queryParamFormat !== newFormat || this.queryParamLocation !== newLocation || this.queryParamLanguage !== newLanguage) {
          this.queryParamFormat = newFormat;
          this.queryParamLocation = newLocation;
          this.queryParamLanguage = newLanguage;

          // Update component state variables
          this.format = newFormat;
          this.location = newLocation;
          this.selectedLanguage = newLanguage;

          this.updateLocation();
        }
      })
    );
    this.fetchMovieDetails();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  fetchMovieDetails(): void {
    if (this.movieID) {
      this.subscriptions.add(
        this.movieService.getMovieById(this.movieID).subscribe(
          (movie) => {
            this.movieName = movie.name;
            this.genre = movie.genre;
            this.languages = movie.languages;
            this.formats = movie.formats;
          },
          (error) => {
            console.error('Error fetching movie details', error);
          }
        )
      );
    }
  }

  updateLocation(): void {
      this.subscriptions.add(
        this.locationService.cityName$.subscribe((city) => {
          this.location = city;
          this.updateURL();
          this.fetchShows();
        })
      );
  }

  fetchShows(): void {
    if (this.movieID) {
      const queryParams = `?format=${this.queryParamFormat}&location=${this.queryParamLocation}&language=${this.queryParamLanguage}`;
      this.subscriptions.add(
        this.showService.getShowsByMovieId(this.movieID, queryParams).subscribe(
          (response: any) => {
            this.dateGroups = response.map((group: any) => ({
              date: group.date,
              cinemas: group.cinemas.map((cinema: any) => ({
                cinema_id: cinema.cinema_id,
                cinema_name: cinema.cinema_name,
                location: cinema.location,
                food_service: cinema.food_service,
                shows: cinema.shows.map((show: any) => ({
                  _id: show._id,
                  start_time: show.start_time,
                  seat_info: show.seat_info,
                })),
              })),
            }));
            this.selectDate(0);
          },
          (error) => {
            console.error('Error fetching shows', error);
          }
        )
      );
    }
  }

  selectDate(index: number): void {
    this.selectedDateIndex = index;
    this.selectedDateGroup = this.dateGroups[index];
  }

  getSeatInfo(show: Show): string {
    return show.seat_info
      ? show.seat_info.map((seat) => `${seat.type}: ${seat.price}`).join('\n')
      : 'No seat information available';
  }

  onLanguageChange(event: any): void {
    this.selectedLanguage = event.value;
    this.updateURL();
  }

  onFormatChange(event: any): void {
    this.format = event.value;
    this.updateURL();
  }

  updateURL(): void {
    const queryParams = {
      format: this.format,
      location: this.location,
      language: this.selectedLanguage,
    };
    this.router.navigate([], { queryParams });
  }

  onShowSelect(show: any): void {
    this.router.navigate(['movies/book-tickets', show._id]);
  }
}

