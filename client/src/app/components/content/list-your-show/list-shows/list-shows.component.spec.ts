import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShowsComponent } from './list-shows.component';

describe('ListShowsComponent', () => {
  let component: ListShowsComponent;
  let fixture: ComponentFixture<ListShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListShowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
