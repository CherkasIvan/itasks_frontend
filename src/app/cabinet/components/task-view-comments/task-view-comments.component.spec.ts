import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewCommentsComponent } from './task-view-comments.component';

describe('TaskViewCommentsComponent', () => {
  let component: TaskViewCommentsComponent;
  let fixture: ComponentFixture<TaskViewCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskViewCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
