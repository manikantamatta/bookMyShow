import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseByCinemaComponent } from './browse-by-cinema.component';

describe('BrowseByCinemaComponent', () => {
  let component: BrowseByCinemaComponent;
  let fixture: ComponentFixture<BrowseByCinemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseByCinemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseByCinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
