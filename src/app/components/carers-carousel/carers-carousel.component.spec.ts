import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarersCarouselComponent } from './carers-carousel.component';

describe('CarersCarouselComponent', () => {
  let component: CarersCarouselComponent;
  let fixture: ComponentFixture<CarersCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarersCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarersCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
