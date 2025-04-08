import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewCommentLinkPreviewComponent } from './task-view-comment-link-preview.component';

describe('TaskViewCommentLinkPreviewComponent', () => {
  let component: TaskViewCommentLinkPreviewComponent;
  let fixture: ComponentFixture<TaskViewCommentLinkPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskViewCommentLinkPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewCommentLinkPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
