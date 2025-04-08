import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteConfirmComponent } from './invite-confirm.component';

describe('InviteConfirmComponent', () => {
  let component: InviteConfirmComponent;
  let fixture: ComponentFixture<InviteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
