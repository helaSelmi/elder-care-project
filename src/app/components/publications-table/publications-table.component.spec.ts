import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsTableComponent } from './publications-table.component';

describe('PublicationsTableComponent', () => {
  let component: PublicationsTableComponent;
  let fixture: ComponentFixture<PublicationsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
