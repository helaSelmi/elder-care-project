import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccompagnantsTableComponent } from './accompagnants-table.component';

describe('AccompagnantsTableComponent', () => {
  let component: AccompagnantsTableComponent;
  let fixture: ComponentFixture<AccompagnantsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccompagnantsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccompagnantsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
