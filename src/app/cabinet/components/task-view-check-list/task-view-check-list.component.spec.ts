import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewCheckListComponent } from './task-view-check-list.component';

describe('TaskViewCheckListComponent', () => {
  let component: TaskViewCheckListComponent;
  let fixture: ComponentFixture<TaskViewCheckListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskViewCheckListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
