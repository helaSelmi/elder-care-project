import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAccompagnantComponent } from './signup-accompagnant.component';

describe('SignupAccompagnantComponent', () => {
  let component: SignupAccompagnantComponent;
  let fixture: ComponentFixture<SignupAccompagnantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupAccompagnantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAccompagnantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
