import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewTagComponent } from './task-view-tag.component';

describe('TaskViewTagComponent', () => {
  let component: TaskViewTagComponent;
  let fixture: ComponentFixture<TaskViewTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskViewTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
