import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewFollowersComponent } from './task-view-followers.component';

describe('TaskViewFollowersComponent', () => {
  let component: TaskViewFollowersComponent;
  let fixture: ComponentFixture<TaskViewFollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskViewFollowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
