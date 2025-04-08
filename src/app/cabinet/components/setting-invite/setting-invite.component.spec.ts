import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingInviteComponent } from './setting-invite.component';

describe('SettingInviteComponent', () => {
  let component: SettingInviteComponent;
  let fixture: ComponentFixture<SettingInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
