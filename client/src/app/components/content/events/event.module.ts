import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookTicketsComponent } from './book-tickets/book-tickets.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventsComponent } from './events.component';
import { PaymentGatewayEventComponent } from './payment-gateway-event/payment-gateway-event.component';

const routes: Routes =[
    { path: '', component: EventsComponent },
    { path: 'book-event-tickets/:id', component: BookTicketsComponent },
    { path: ':id', component: EventDetailsComponent },
]

@NgModule({
    declarations: [
      EventsComponent,
      EventDetailsComponent,
      BookTicketsComponent,
      PaymentGatewayEventComponent,
    ],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ]
  })
  export class EventsModule { }