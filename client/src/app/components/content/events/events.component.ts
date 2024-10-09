import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventService } from 'src/app/services/event/event.service';
import { LocationService } from 'src/app/sharedservice/location.service';
import { Language, Event_category, DateGroup } from 'src/app/constants/filters';
import { getimageURl } from 'src/app/utils/util';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  location: string | null = null;
  Events: any[] = [];
  filteredEvents: any[] = [];
  selectedCategories: string[] = [];
  selectedLanguages: string[] = [];
  selectedDateGroup: string[] = [];
  availableCategories = Event_category;
  availableLanguages = Language;
  availableDateGroup = DateGroup;
  initialLoad = true;
  backendurl: string = 'http://localhost:3000/';
  isDropdownOpen: { [key: string]: boolean } = {
    DateGroup: true,
    language: false,
    category: false
  };

  private subscriptions: Subscription = new Subscription();

  constructor(
    private eventService: EventService,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      combineLatest([
        this.locationService.cityName$,
        this.route.queryParams
      ]).pipe(
        switchMap(([city, params]) => {
          this.location = city;
          if (this.initialLoad) {
            this.initialLoad = false;
            this.initializeFiltersFromQueryParams(params);
          }
          return this.eventService.getFilteredEvent(this.buildQueryParams());
        })
      ).subscribe(events => {
        this.Events = events;
        this.filteredEvents = events;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initializeFiltersFromQueryParams(params: any): void {
    if (params['languages']) {
      this.selectedLanguages = params['languages'].split(',');
    }
    if (params['category']) {
      this.selectedCategories = params['category'].split(',');
    }
    if (params['DateGroup']) {
      this.selectedDateGroup = params['DateGroup'];
    }
  }

  updateSelectedItems(value: string, selectedArray: string[], isChecked: boolean): void {
    if (isChecked) {
      selectedArray.push(value);
    } else {
      const index = selectedArray.indexOf(value);
      if (index > -1) {
        selectedArray.splice(index, 1);
      }
    }
  }

  onFilterChange(type: string, value: string): void {
    if (type === 'category') {
      this.updateSelectedItems(value, this.selectedCategories, !this.selectedCategories.includes(value));
    } else if (type === 'language') {
      this.updateSelectedItems(value, this.selectedLanguages, !this.selectedLanguages.includes(value));
    } else if (type === 'DateGroup') {
      this.updateSelectedItems(value, this.selectedDateGroup, !this.selectedDateGroup.includes(value));
    }
  }

  onDateGroupChange(value: string): void {
    this.selectedDateGroup = [value];
  }

  applyFilters(): void {
    let queryParams: Params = {};

    if (this.selectedLanguages.length) {
      queryParams['languages'] = this.selectedLanguages.join(',');
    } else {
      queryParams['languages'] = null;
    }

    if (this.selectedCategories.length) {
      queryParams['category'] = this.selectedCategories.join(',');
    } else {
      queryParams['category'] = null;
    }

    if (this.selectedDateGroup.length) {
      queryParams['DateGroup'] = this.selectedDateGroup;
    } else {
      queryParams['DateGroup'] = null;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });

    this.fetchEvents();
  }

  clearFilter(type: string): void {
    if (type === 'category') {
      this.selectedCategories = [];
    } else if (type === 'language') {
      this.selectedLanguages = [];
    } else if (type === 'DateGroup') {
      this.selectedDateGroup = [];
    }
    this.applyFilters();
  }

  fetchEvents(): void {
    const queryParams = this.buildQueryParams();
    this.subscriptions.add(
      this.eventService.getFilteredEvent(queryParams).subscribe(events => {
        this.Events = events;
        this.filteredEvents = events;
      })
    );
  }

  buildQueryParams(): string {
    const params = [];

    if (this.location) {
      params.push(`location=${this.location}`);
    }
    if (this.selectedLanguages.length > 0) {
      params.push(`languages=${this.selectedLanguages.join('|')}`);
    }
    if (this.selectedCategories.length > 0) {
      params.push(`category=${this.selectedCategories.join('|')}`);
    }
    if (this.selectedDateGroup.length > 0) {
      params.push(`DateGroup=${this.selectedDateGroup.join('|')}`);
    }

    return params.join('&');
  }

  toggleDropdown(type: string): void {
    this.isDropdownOpen[type] = !this.isDropdownOpen[type];
  }

  resetAllFilters(): void {
    this.selectedCategories = [];
    this.selectedLanguages = [];
    this.selectedDateGroup = [];
    this.applyFilters();
  }

  fetchEventDetails(event: any): void {
    this.router.navigate([`/events/${event._id}`]);
  }

  getDateGroupValue(value: string): string {
    if (value === 'Today') return 'Today';
    if (value === 'This Weekend') return 'Weekend';
    return 'nxtWeek';
  }

  getBackDateGroupValue(value: string): string {
    if (value === 'Today') return 'Today';
    if (value === 'Weekend') return 'This Weekend';
    return 'Next Week';
  }

  showImage(image: string): string {
    return getimageURl(image);
  }
}