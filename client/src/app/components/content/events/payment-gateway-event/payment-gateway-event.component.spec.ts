import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatewayEventComponent } from './payment-gateway-event.component';

describe('PaymentGatewayEventComponent', () => {
  let component: PaymentGatewayEventComponent;
  let fixture: ComponentFixture<PaymentGatewayEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentGatewayEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentGatewayEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
