import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewCommentFormTimeComponent } from './task-view-comment-form-time.component';

describe('TaskViewCommentFormTimeComponent', () => {
  let component: TaskViewCommentFormTimeComponent;
  let fixture: ComponentFixture<TaskViewCommentFormTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskViewCommentFormTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewCommentFormTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
