import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';
import { LocationService } from 'src/app/sharedservice/location.service';
import { Events } from 'src/app/models/event';
import { getimageURl } from 'src/app/utils/util';
import { ToasterService } from 'src/app/sharedservice/toaster.service';
import { RatingService } from 'src/app/services/rating/rating.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  event: any
  eventId: string | null = null;
  location: string | null = null;
  hasShownInterested:boolean=false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private locationService: LocationService,
    private toasterService:ToasterService,
    private ratingService:RatingService
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.eventService.getEventById(this.eventId).subscribe((event:Events)=>{
        this.event=event;
      }
      );
    }
    this.locationService.cityName$.subscribe(city => {
      this.location = city;
    });
  }

  bookTickets(): void {
    if (this.event) {
      const queryParams = {
        location: this.location,
      };
      this.router.navigate(['events/book-event-tickets', this.eventId],);
    }
  }
  showImage(image: string): string {
    return getimageURl(image);
  }

  likeMovie(): void {
    const payload={
      entity:'EVE',
      entityId:this.eventId||''
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
}

