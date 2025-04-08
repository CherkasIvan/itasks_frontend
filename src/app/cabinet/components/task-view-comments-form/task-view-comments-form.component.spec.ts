import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewCommentsFormComponent } from './task-view-comments-form.component';

describe('TaskViewCommentsFormComponent', () => {
  let component: TaskViewCommentsFormComponent;
  let fixture: ComponentFixture<TaskViewCommentsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskViewCommentsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewCommentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
