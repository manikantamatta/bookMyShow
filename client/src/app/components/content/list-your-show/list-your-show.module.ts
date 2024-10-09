import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListYourShowComponent } from './list-your-show.component';
import { UpdateMovieComponent } from './update-movie/update-movie.component';
import { ListMovieComponent } from './list-movie/list-movie.component';
import { ListCinemaComponent } from './list-cinema/list-cinema.component';
import { ListShowsComponent } from './list-shows/list-shows.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BusinessAccessGuard, BusinessGuard } from '../../../guard/admin.guard';
import { SharedModule } from 'src/app/shared.module';

const routes: Routes = [
  { path: '', component: ListYourShowComponent },
  { path: 'movie/update', component: UpdateMovieComponent, canActivate: [BusinessGuard, BusinessAccessGuard], data: { entity: 'MOV' } },
  { path: 'movie', component: ListMovieComponent, canActivate: [BusinessGuard, BusinessAccessGuard], data: { entity: 'MOV' } },
  { path: 'cinema', component: ListCinemaComponent, canActivate: [BusinessGuard, BusinessAccessGuard], data: { entity: 'CIN' } },
  { path: 'shows', component: ListShowsComponent, canActivate: [BusinessGuard, BusinessAccessGuard], data: { entity: 'SHO' } },
  { path: 'events', component: ListEventsComponent, canActivate: [BusinessGuard, BusinessAccessGuard], data: { entity: 'EVE' } },
  { path: 'home', component: MainPageComponent, canActivate: [BusinessGuard] },
];

@NgModule({
  declarations: [
    ListYourShowComponent,
    UpdateMovieComponent,
    ListMovieComponent,
    ListCinemaComponent,
    ListShowsComponent,
    ListEventsComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ListYourShowModule { }