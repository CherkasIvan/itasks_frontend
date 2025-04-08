import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOnlyHeaderComponent } from './select-only-header.component';

describe('SelectOnlyHeaderComponent', () => {
  let component: SelectOnlyHeaderComponent;
  let fixture: ComponentFixture<SelectOnlyHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectOnlyHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOnlyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
