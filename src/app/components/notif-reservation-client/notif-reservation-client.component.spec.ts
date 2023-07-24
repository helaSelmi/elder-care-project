import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifReservationClientComponent } from './notif-reservation-client.component';

describe('NotifReservationClientComponent', () => {
  let component: NotifReservationClientComponent;
  let fixture: ComponentFixture<NotifReservationClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifReservationClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifReservationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
