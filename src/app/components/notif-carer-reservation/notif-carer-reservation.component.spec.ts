import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifCarerReservationComponent } from './notif-carer-reservation.component';

describe('NotifCarerReservationComponent', () => {
  let component: NotifCarerReservationComponent;
  let fixture: ComponentFixture<NotifCarerReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifCarerReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifCarerReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
