import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationLoginComponent } from './validation-login.component';

describe('ValidationLoginComponent', () => {
  let component: ValidationLoginComponent;
  let fixture: ComponentFixture<ValidationLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
