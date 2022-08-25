import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAlertComponent } from './order-alert.component';

describe('OrderAlertComponent', () => {
  let component: OrderAlertComponent;
  let fixture: ComponentFixture<OrderAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
