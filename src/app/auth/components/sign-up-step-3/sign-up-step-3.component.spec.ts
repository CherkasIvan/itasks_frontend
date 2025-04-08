import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpStep3Component } from './sign-up-step-3.component';

describe('SignUpStep3Component', () => {
  let component: SignUpStep3Component;
  let fixture: ComponentFixture<SignUpStep3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpStep3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
