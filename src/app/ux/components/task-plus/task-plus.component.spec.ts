import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPlusComponent } from './task-plus.component';

describe('TaskPlusComponent', () => {
  let component: TaskPlusComponent;
  let fixture: ComponentFixture<TaskPlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskPlusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
