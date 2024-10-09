import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './components/content/movies/movies.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MovieDetailsComponent } from './components/content/movies/movie-details/movie-details.component';
import { ShowsComponent } from './components/content/movies/shows/shows.component';
import { BookSeatsComponent } from './components/content/movies/book-seats/book-seats.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserBookingsComponent } from './components/user/user-bookings/user-bookings.component';
import { BrowseByCinemaComponent } from './components/content/movies/browse-by-cinema/browse-by-cinema.component';
import { BuyTicketsComponent } from './components/content/movies/browse-by-cinema/buy-tickets/buy-tickets.component';

import { AdminComponent } from './components/content/admin/admin.component';
import { LoginGuard } from './guard/admin.guard';
import { HomeComponent } from './components/content/home/home.component';


const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent ,canActivate:[LoginGuard]},
  { path: 'movies', loadChildren: () => import('./components/content/movies/movie.module').then(m => m.MovieModule) },
  { path: 'events', loadChildren: () => import('./components/content/events/event.module').then(m => m.EventsModule) },
  // { path: 'cinemas', component: BrowseByCinemaComponent},
  // { path: 'buyticketsByCinema/:id', component: BuyTicketsComponent},
  { path: '404', component: PageNotFoundComponent },
  // { path: 'shows/:id', component: ShowsComponent},
  // { path: 'book-tickets/:id', component: BookSeatsComponent},
  { path: 'my-profile', component:UserProfileComponent,canActivate:[LoginGuard]},
  { path: 'my-bookings', component:UserBookingsComponent,canActivate:[LoginGuard]},
  { path: 'list-shows', loadChildren: () => import('./components/content/list-your-show/list-your-show.module').then(m => m.ListYourShowModule) },







  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
