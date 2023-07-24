import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationUsersComponent } from './validation-users.component';

describe('ValidationUsersComponent', () => {
  let component: ValidationUsersComponent;
  let fixture: ComponentFixture<ValidationUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
