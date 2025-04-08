import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewCommentsTimeComponent } from './task-view-comments-time.component';

describe('TaskViewCommentsTimeComponent', () => {
  let component: TaskViewCommentsTimeComponent;
  let fixture: ComponentFixture<TaskViewCommentsTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskViewCommentsTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewCommentsTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
