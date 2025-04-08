import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewFilesComponent } from './task-view-files.component';

describe('TaskViewFilesComponent', () => {
  let component: TaskViewFilesComponent;
  let fixture: ComponentFixture<TaskViewFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskViewFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
