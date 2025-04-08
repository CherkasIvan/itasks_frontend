import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupStatusComponent } from './popup-status.component';

describe('PopupStatusComponent', () => {
  let component: PopupStatusComponent;
  let fixture: ComponentFixture<PopupStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
