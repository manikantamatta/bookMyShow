import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusinessService } from 'src/app/services/business/business.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ShowService } from 'src/app/services/show/show.service';
import { AuthServiceService } from 'src/app/sharedservice/auth-service.service';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/sharedservice/toaster.service';

@Component({
  selector: 'app-list-shows',
  templateUrl: './list-shows.component.html',
  styleUrls: ['./list-shows.component.scss']
})
export class ListShowsComponent implements OnInit {
  cinemas: { name: string, id: string, _id: string }[] = [];
  movies: { name: string, _id: string,genre:string[] }[] = [];
  languages: string[] = ['English', 'Hindi', 'Spanish', 'French'];
  formats: string[] = ['2D', '3D', 'IMAX'];
  selectedGenres: string[] = []; 
  selectedCinemaId: string = '';
  selectedDate: string = '';
  selectedMovieId: string = '';
  showsData: any[] | null = null;
  selectedScreen: number | null = null;
  showStartTime: string = '';
  showEndTime: string = '';
  selectedLanguage: string = 'Hindi'; // Default value
  selectedFormat: string = '2D'; // Default value
  seatingArrangement: any[] = [];
  seatNumbers: string[] = [];
  businessId: string | null = null;
  seatingArrangementData: any[] = [];
  city: any;

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService,
    private businessService: BusinessService,
    private movieService: MovieService,
    private showService: ShowService,
    private cinemaService: CinemaService,
    private toasterService: ToasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getBusinessId().subscribe(userId => {
      this.businessId = userId;
      this.fetchBusiness();
      this.fetchMovies();
    });
  }

  fetchBusiness(): void {
    if (this.businessId) {
      this.businessService.fetchBusinessById(this.businessId).subscribe(data => {
        if (data && data.Cinitems) {
          this.cinemas = data.Cinitems;
        } else {
          console.error("CinItems is undefined or empty");
        }
      });
    }
  }

  fetchMovies(): void {
    this.movieService.getMovieNames().subscribe((response) => {
      this.movies=response;
    });
  }
  
  populateGenre(selectedId: string): void {
    const selectedMovie = this.movies.find(movie => movie._id === selectedId);
    if (selectedMovie) {
      this.selectedGenres = selectedMovie.genre;
    } else {
      this.selectedGenres = [];
    }
  }
  onSubmit(): void {
    if (this.selectedCinemaId && this.selectedDate && this.selectedMovieId) {
      this.fetchShows(this.selectedCinemaId, this.selectedDate);
      this.populateGenre(this.selectedMovieId);
    }
  }

  fetchShows(cinemaId: string, date: string): void {
    this.showService.getShowTimeSlots(cinemaId, date).subscribe((response) => {
      this.showsData = response;
    });
  }

  fetchSeatingArrangement(screen: number): void {
    this.cinemaService.getCinemaById(this.selectedCinemaId).subscribe((response) => {
      this.seatingArrangementData = response.seating_arrangement;
      this.city = response.city;
      this.seatingArrangement = this.seatingArrangementData.find(arrangement => arrangement.screens_no.includes(screen))?.seats || [];
      this.sendShowData();
    });
  }

  
  addSeatNumber(seatNumber: string): void {
    if (seatNumber) {
      this.seatNumbers.push(seatNumber);
    }
  }

  saveShow(): void {
    if (this.selectedScreen !== null && this.showStartTime && this.showEndTime) {
      this.fetchSeatingArrangement(this.selectedScreen);
    }
  }

  sendShowData(): void {

    const showData = {
      movie_id: this.selectedMovieId,
      cinema_id: this.selectedCinemaId,
      start_time: new Date(this.showStartTime).toISOString(),
      end_time: new Date(this.showEndTime).toISOString(),
      show_date: new Date(this.selectedDate).toISOString(),
      language: this.selectedLanguage,
      format: this.selectedFormat,
      genre: this.selectedGenres, 
      city: this.city,
      screen: this.selectedScreen,
      seat_info: this.seatingArrangement
    };

    this.showService.addShow(showData).subscribe(
      (response) => {
        this.toasterService.showSuccess('Show saved successfully!');
        this.router.navigate(['/list-shows/home']);
      },
      (error) => {
        this.toasterService.showError('Failed to save show.');
      }
    );
  }
}
