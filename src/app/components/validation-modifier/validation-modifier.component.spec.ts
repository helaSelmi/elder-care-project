import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationModifierComponent } from './validation-modifier.component';

describe('ValidationModifierComponent', () => {
  let component: ValidationModifierComponent;
  let fixture: ComponentFixture<ValidationModifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationModifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
