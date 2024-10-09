import { Component, OnInit } from '@angular/core';
import { CinemaDetails, CinemaResponse } from 'src/app/models/cinema';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
import { LocationService } from 'src/app/sharedservice/location.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-by-cinema',
  templateUrl: './browse-by-cinema.component.html',
  styleUrls: ['./browse-by-cinema.component.scss']
})
export class BrowseByCinemaComponent implements OnInit {
  location: string | null = null;
  cinemas: CinemaDetails[] = [];
  page: number = 1;
  limit: number = 3; 
  totalCinemas: number = 0;

  constructor(private locationService: LocationService, private cinemaService: CinemaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchLocation();
  }

  fetchLocation(): void {
    this.locationService.cityName$.subscribe(city => {
      this.location = city;
      this.fetchCinemas();
    });
  }

  fetchCinemas(): void {
    if (this.location) {
      this.cinemaService.getAllCinemasByLocation(this.location, this.page, this.limit).subscribe(response => {
        this.cinemas = response.cinema; 
        this.totalCinemas = response.totalCinemas;  
      });
    }
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.fetchCinemas();
  }
  buyTicketsByCinema(cinema:any):void{
    this.router.navigate(['movies/buyticketsByCinema/',cinema._id]);
  }
}