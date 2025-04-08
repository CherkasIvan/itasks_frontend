import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHeaderUserComponent } from './select-header-user.component';

describe('SelectHeaderUserComponent', () => {
  let component: SelectHeaderUserComponent;
  let fixture: ComponentFixture<SelectHeaderUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectHeaderUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectHeaderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
