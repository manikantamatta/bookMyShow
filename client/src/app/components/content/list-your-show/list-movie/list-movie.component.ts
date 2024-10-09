import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusinessService } from 'src/app/services/business/business.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { AuthServiceService } from 'src/app/sharedservice/auth-service.service';
import { Router } from '@angular/router'; // Import Router service
import { ToasterService } from 'src/app/sharedservice/toaster.service';

@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.scss']
})
export class ListMovieComponent implements OnInit {
  movieForm: FormGroup;
  genres: string[] = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror','Romance']; 
  languages: string[] = ['Hindi', 'English', 'Spanish', 'French'];
  formats: string[] = ['2D', '3D', 'IMAX']; // Added formats
  movie_ratings: string[] = ['U', 'UA', 'A', 'S']; // Updated movie ratings
  minDate: string;
  selectedFile: File | null = null;
  uploadError: string | null = null;
  Business: any;
  BusinessId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private businessService: BusinessService,
    private authService: AuthServiceService,
    private toasterService: ToasterService, // Inject ToasterService
    private router: Router // Inject Router service
  ) {
    // Initialize the form with validation rules
    this.movieForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      duration: ['', [Validators.required, Validators.min(30)]],
      genre: [[], Validators.required],
      languages: [[], Validators.required],
      imageUrl: ['', Validators.required],
      movieRated: ['', Validators.required],
      releaseDate: ['', Validators.required],
      cast: ['', Validators.required], // Changed to string
      crew: ['', Validators.required], // Changed to string
      formats: [[], Validators.required] // Added formats
    });

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    // Fetch the BusinessId from the AuthService
    this.authService.getBusinessId().subscribe((userId) => {
      this.BusinessId = userId;
      // Fetch Business details using the fetched BusinessId
      this.businessService.fetchBusinessById(this.BusinessId || '').subscribe((data) => {
        this.Business = data;
      });
    });
  }

  onFileChange(event: any): void {
    // Handle file selection
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    // Validate the form and ensure a file is selected
    if (this.movieForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.movieForm.get('name')?.value);
      formData.append('description', this.movieForm.get('description')?.value);
      formData.append('duration', this.movieForm.get('duration')?.value);
      formData.append('genre', this.movieForm.get('genre')?.value.join(','));
      formData.append('languages', this.movieForm.get('languages')?.value.join(','));
      formData.append('cast', this.splitData(this.movieForm.get('cast')?.value).join(','));
      formData.append('crew', this.splitData(this.movieForm.get('crew')?.value).join(','));
      formData.append('formats', this.movieForm.get('formats')?.value.join(','));
      formData.append('image_url', this.selectedFile);
      formData.append('movie_rated', this.movieForm.get('movieRated')?.value);
      formData.append('release_date', this.movieForm.get('releaseDate')?.value);
  
      // Upload the movie details to the server
      this.movieService.UploadMovie(formData).subscribe(
        (response: any) => {
          if (this.Business) {
            if (!this.Business.Movitems) {
              this.Business.Movitems = [];
            }
            this.Business.Movitems.push({ id: response._id, name: response.name });
            this.businessService.updateBusiness(this.BusinessId || '', this.Business).subscribe(() => {
              this.toasterService.showSuccess('Movie added successfully!');
              this.router.navigate(['list-shows/home']);
            });
          } else {
            this.toasterService.showError('Business not found.');
          }
        },
        (error: any) => {
          console.error('Upload failed', error);
          this.uploadError = 'Failed to upload movie. Please try again.';
        }
      );
    } else {
      this.uploadError = 'Please fill out all required fields and select an image.';
    }
  }

  splitData(data: string): string[] {
    return data.split(',').map((item) => item.trim());
  }

  get formControls() {
    return this.movieForm.controls;
  }
}