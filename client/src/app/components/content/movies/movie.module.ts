import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { RatingDialogComponent } from "../../shared/rating-dialog/rating-dialog.component";
import { BookSeatsComponent } from "./book-seats/book-seats.component";
import { BrowseByCinemaComponent } from "./browse-by-cinema/browse-by-cinema.component";
import { BuyTicketsComponent } from "./browse-by-cinema/buy-tickets/buy-tickets.component";
import { SelectSeatsNumberComponent } from "./dialog/select-seats-number/select-seats-number.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MoviesComponent } from "./movies.component";
import { PaymentGatewayComponent } from "./payment-gateway/payment-gateway.component";
import { ShowsComponent } from "./shows/shows.component";
import { SplitPipe } from "src/app/pipes/split.pipe";
import { SharedModule } from "src/app/shared.module";


const routes: Routes = [
    { path: '', component: MoviesComponent},
    { path: 'cinemas', component: BrowseByCinemaComponent},
    { path: 'buyticketsByCinema/:id', component: BuyTicketsComponent},
    { path: 'shows/:id', component: ShowsComponent},
    { path: 'book-tickets/:id', component: BookSeatsComponent},
    { path: ':id', component: MovieDetailsComponent},



]

@NgModule({
    declarations: [
        MoviesComponent,
        MovieDetailsComponent,
        ShowsComponent,
        BookSeatsComponent,
        SelectSeatsNumberComponent,
        PaymentGatewayComponent,
        RatingDialogComponent,
        SplitPipe,
        BrowseByCinemaComponent,
        BuyTicketsComponent
        
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class MovieModule {}