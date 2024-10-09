import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/services/business/business.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { AuthServiceService } from 'src/app/sharedservice/auth-service.service';
import { ToasterService } from 'src/app/sharedservice/toaster.service';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.scss']
})
export class UpdateMovieComponent implements OnInit {
  businessId:string|null= this.authService.getCurrentBusinessId();
  arrMovies:any[]=[];
  constructor(
    private businessService: BusinessService,
    private authService: AuthServiceService,
    private toasterService: ToasterService,
    private router: Router,
    private movieService:MovieService
  ) { }

  ngOnInit(): void {
    this.fetchBusinessMovies();
    
  }
  fetchBusinessMovies(){
    this.businessService.getAccessItems(this.businessId||'','MOV').subscribe((data)=>{
      this.arrMovies=data;
    })
  }

  fetchMovieDetails(movieId:string){
    this.movieService.getMovieById(movieId).subscribe((data)=>{
    });
  }
  
}
