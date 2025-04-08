import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewArchivePopupComponent } from './task-view-archive-popup.component';

describe('TaskViewArchivePopupComponent', () => {
  let component: TaskViewArchivePopupComponent;
  let fixture: ComponentFixture<TaskViewArchivePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskViewArchivePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewArchivePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
