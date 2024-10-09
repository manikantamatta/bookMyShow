import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CinemaService } from 'src/app/services/cinema/cinema.service';

interface SeatInfo {
  type: string;
  status: string[]; // Status is an array of strings
  price: number;
  _id: string;
}

interface Show {
  _id: string;
  start_time: string;
  end_time: string;
  format: string;
  language: string;
  genre: string[]; // Changed to an array of strings
  seat_info: SeatInfo[];
}

interface Movie {
  movie_id: string; // Changed to single string
  movie_name: string;
  shows: Show[]; // Changed from nested arrays to a single array
}

interface DateGroup {
  date: string; // The date field is 'date'
  movies: Movie[];
}

@Component({
  selector: 'app-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.scss'],
})
export class BuyTicketsComponent implements OnInit {
  dateGroups: DateGroup[] = [];

  constructor(
    private cinemaService: CinemaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCinemaDetails();
  }

  fetchCinemaDetails(): void {
    const cinemaId = this.route.snapshot.paramMap.get('id');
    if (cinemaId) {
      this.cinemaService.getMoviesByCinemaId(cinemaId).subscribe((data: DateGroup[]) => {
        // Map the response to format dates properly
        this.dateGroups = data.map(group => ({
          ...group,
          date: new Date(group.date).toString() !== 'Invalid Date' ? group.date : 'Unknown Date'
        }));
      });
    }
  }

  // Format seat info for tooltip display
  getSeatInfo(show: Show): string {
    if (!show.seat_info || show.seat_info.length === 0) return 'No seat info available';
    return show.seat_info
      .map((seat) => `${seat.type}: Rs ${seat.price}`)
      .join(', ');
  }

  onShowSelect(show: Show): void {
    this.router.navigate(['movies/book-tickets', show._id]);
  }
}
