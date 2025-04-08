import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewCommentFormFileComponent } from './task-view-comment-form-file.component';

describe('TaskViewCommentFormFileComponent', () => {
  let component: TaskViewCommentFormFileComponent;
  let fixture: ComponentFixture<TaskViewCommentFormFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskViewCommentFormFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewCommentFormFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
