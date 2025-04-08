import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewCommentItemComponent } from './task-view-comment-item.component';

describe('TaskViewCommentItemComponent', () => {
  let component: TaskViewCommentItemComponent;
  let fixture: ComponentFixture<TaskViewCommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskViewCommentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewCommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
