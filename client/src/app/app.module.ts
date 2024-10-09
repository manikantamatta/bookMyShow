import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannerComponent } from './components/banner/banner.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { LocationComponent } from './components/shared/location/location.component';
import { HomeComponent } from './components/content/home/home.component';
import { MoviesComponent } from './components/content/movies/movies.component';
import { EventsComponent } from './components/content/events/events.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { SearchComponent } from './components/banner/search/search.component';
import { MovieDetailsComponent } from './components/content/movies/movie-details/movie-details.component';
import { ShowsComponent } from './components/content/movies/shows/shows.component';
import { BookSeatsComponent } from './components/content/movies/book-seats/book-seats.component';
import { SplitPipe } from './pipes/split.pipe';
import { SelectSeatsNumberComponent } from './components/content/movies/dialog/select-seats-number/select-seats-number.component';
import { PaymentGatewayComponent } from './components/content/movies/payment-gateway/payment-gateway.component';
import { RatingDialogComponent } from './components/shared/rating-dialog/rating-dialog.component'; 
import { EventDetailsComponent } from './components/content/events/event-details/event-details.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserBookingsComponent } from './components/user/user-bookings/user-bookings.component';
import { BrowseByCinemaComponent } from './components/content/movies/browse-by-cinema/browse-by-cinema.component';
import { BuyTicketsComponent } from './components/content/movies/browse-by-cinema/buy-tickets/buy-tickets.component';
import { ListYourShowComponent } from './components/content/list-your-show/list-your-show.component';
import { ListMovieComponent } from './components/content/list-your-show/list-movie/list-movie.component';
import { ListCinemaComponent } from './components/content/list-your-show/list-cinema/list-cinema.component';
import { ListShowsComponent } from './components/content/list-your-show/list-shows/list-shows.component';
import { BookTicketsComponent } from './components/content/events/book-tickets/book-tickets.component';
import { PaymentGatewayEventComponent } from './components/content/events/payment-gateway-event/payment-gateway-event.component';
import { ListEventsComponent } from './components/content/list-your-show/list-events/list-events.component';
import { MainPageComponent } from './components/content/list-your-show/main-page/main-page.component';
import { AdminComponent } from './components/content/admin/admin.component';
import { WarningDialogComponent } from './components/content/movies/dialog/warning-dialog/warning-dialog.component';
import { SelectFormatComponent } from './components/content/movies/dialog/select-format/select-format.component';
import { UpdateMovieComponent } from './components/content/list-your-show/update-movie/update-movie.component';
import { SharedModule } from 'src/app/shared.module'

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    ContentComponent,
    FooterComponent,
    LocationComponent,
    LoginComponent,
    HomeComponent,
    // MoviesComponent,
    PageNotFoundComponent,
    AuthComponent,
    RegisterComponent,
    SearchComponent,
    // MovieDetailsComponent,
    // ShowsComponent,
    // BookSeatsComponent,
    // SplitPipe,
    // SelectSeatsNumberComponent,
    // PaymentGatewayComponent,
    // RatingDialogComponent,
    UserProfileComponent,
    UserBookingsComponent,
    // BrowseByCinemaComponent,
    // BuyTicketsComponent,
    AdminComponent,
    WarningDialogComponent,
    SelectFormatComponent,
    // UpdateMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
