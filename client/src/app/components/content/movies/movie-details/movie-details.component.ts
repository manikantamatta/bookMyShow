  import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';
import { RatingService } from 'src/app/services/rating/rating.service';
import { LocationService } from 'src/app/sharedservice/location.service';
import { MatDialog } from '@angular/material/dialog';
import { RatingDialogComponent } from 'src/app/components/shared/rating-dialog/rating-dialog.component';
import { getimageURl } from 'src/app/utils/util';
import { PageEvent } from '@angular/material/paginator';
import { AuthServiceService } from 'src/app/sharedservice/auth-service.service';
import { SelectFormatComponent } from '../dialog/select-format/select-format.component';
import { WarningDialogComponent } from '../dialog/warning-dialog/warning-dialog.component';
import { Rating, UserRating } from 'src/app/models/review';
import { ToasterService } from 'src/app/sharedservice/toaster.service';
import { Language } from 'src/app/constants/filters';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  movieId: string | null = null;
  selectedFormat: string | null = null;
  location: string | null = null;
  reviews: any[] = [];
  showRatings: boolean = false;
  ratings: any[] = [];
  paginatedRatings: any[] = [];
  ratingsPerPage: number = 5;
  totalRatingsCount: number = 0;
  page: number = 1; // Default page number
  userId: string | null = null;
  isLoggedIn: boolean = false;
  userRating: UserRating={rating:-1,review:''};
  hasShownInterested:boolean=false;
  selectedLanguage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private locationService: LocationService,
    public dialog: MatDialog,
    private ratingService: RatingService,
    private authService: AuthServiceService,
    private toasterService:ToasterService
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');

    this.authService.getUserId().subscribe((userId) => {
      this.userId = userId;
      if(this.userId && this.movieId){
        this.isLoggedIn = true;
        this.fetchUserRating();
      }
    });

    if (this.movieId) {
      this.movieService.getMovieById(this.movieId).subscribe(
        (movie) => {
          this.movie = movie;
        },
        (error) => {
          console.error('Error fetching movie details', error);
        }
      );
    }
    this.locationService.cityName$.subscribe((city) => {
      this.location = city;
    });
  }
  fetchUserRating(): void {
    if(this.userId && this.movieId){
      this.ratingService.fetchUserRating(this.userId,this.movieId).subscribe(
        (response: UserRating) => {
          this.userRating = response;
        },
        (error: any) => {
          console.error('Error fetching user rating', error);
        }
      );
    }
  }
  bookTickets(): void {
    if (this.movie) {
      const dialogRef = this.dialog.open(SelectFormatComponent, {
        width: '300px',
        data: { formats: this.movie.formats || [] ,
          languages: this.movie.languages || [] } 
      });

      dialogRef.afterClosed().subscribe((selectedParam) => {
        this.selectedFormat=selectedParam.selectedFormat;
        this.selectedLanguage=selectedParam.selectedLanguage;
        if (this.selectedFormat && this.selectedLanguage) {
          if (this.movie.movie_rated === 'A') {
            // Show warning dialog for A-rated movies
            const warningDialogRef = this.dialog.open(WarningDialogComponent, {
              width: '400px'
            });

            warningDialogRef.afterClosed().subscribe((confirmed) => {
              if (confirmed) {
                this.navigateToShowtimes();
              }
            });
          } else {
            this.navigateToShowtimes();
          }
        }
      });
    }
  }

  navigateToShowtimes(): void {
    const queryParams = {
      format: this.selectedFormat,
      location: this.location,
      language: this.selectedLanguage
    };
    this.router.navigate(['movies/shows', this.movieId], { queryParams });
  }

 
  rateNow(): void {
    const dialogRef = this.dialog.open(RatingDialogComponent, {
      width: '400px',
      data: { movie: this.movie }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const payload :Rating= {
          entity: 'MOV',
          userId: this.userId||'',
          entityId: this.movieId||'',
          rating: result.rating,
          review: result.review
        };
        this.ratingService.rateEntity(payload).subscribe(
          (response: any) => {
            this.userRating = {rating: payload.rating, review: payload.review};
            this.toasterService.showSuccess('Rating submitted successfully!');
          },
          (error: any) => {
            this.toasterService.showError('Failed to submit rating. Please try again.');
          }
        );
      }
    });
  }

  likeMovie(): void {
    const payload={
      entity:'MOV',
      entityId:this.movieId||''
    }
    this.ratingService.showInterestInEntity(payload).subscribe(
      (response:any)=>{
        this.hasShownInterested=true;
        this.toasterService.showSuccess("Thank You for Showing Interest")
      },
    (error:any)=>{
      this.toasterService.showError("Sorry. Your input could not be processed at this moment.")
    });
  }

  isMovieReleased(): boolean {
    const releaseDate = new Date(this.movie.release_date);
    const today = new Date();
    return releaseDate <= today;
  }

  showImage(image: string): string {
    return getimageURl(image);
  }

  fetchRating(pageNo: number = this.page, limit: number = this.ratingsPerPage): void {
    this.ratingService.fetchMovieReviews(this.movieId||'', pageNo, limit).subscribe(
      (response: any) => {
        this.ratings = response.ratings || [];
        this.totalRatingsCount = response.totalRatingsCount || 0;
        this.updatePaginatedRatings();
      },
      (error: any) => {
        console.error('Error fetching ratings', error);
      }
    );
  }

  toggleRatings(): void {
    this.showRatings = !this.showRatings;
    if (this.showRatings) {
      this.fetchRating(); 
    }
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1; 
    this.ratingsPerPage = event.pageSize;
    this.fetchRating(this.page, this.ratingsPerPage);
  }

  updatePaginatedRatings(): void {
    const start = 0
    const end = Math.min(this.ratingsPerPage,this.totalRatingsCount-(this.page-1)*this.ratingsPerPage)
    this.paginatedRatings = this.ratings.slice(start, end);
  }
}

