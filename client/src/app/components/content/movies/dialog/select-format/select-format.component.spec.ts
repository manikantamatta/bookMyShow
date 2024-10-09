import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFormatComponent } from './select-format.component';

describe('SelectFormatComponent', () => {
  let component: SelectFormatComponent;
  let fixture: ComponentFixture<SelectFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFormatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
