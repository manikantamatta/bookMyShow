import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSeatsNumberComponent } from './select-seats-number.component';

describe('SelectSeatsNumberComponent', () => {
  let component: SelectSeatsNumberComponent;
  let fixture: ComponentFixture<SelectSeatsNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSeatsNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSeatsNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
