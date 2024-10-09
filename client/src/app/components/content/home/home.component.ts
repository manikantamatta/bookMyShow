import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrendingService } from 'src/app/services/trending/trending.service';
import { getimageURl } from 'src/app/utils/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies: any[] = [];

  constructor(private trendingService: TrendingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchTrendingMovies();
  }

  fetchTrendingMovies() {
    this.trendingService.getTrendingMovies().subscribe((res: any[]) => {
      this.movies = res;
    });
  }

  showImage(image: string): string {
    return getimageURl(image);
  }
  bookTicket(movieId: string) {
    this.router.navigate([`/movies/${movieId}`]);
  }

}
