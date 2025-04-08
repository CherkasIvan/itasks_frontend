import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOnlyItemsComponent } from './select-only-items.component';

describe('SelectOnlyItemsComponent', () => {
  let component: SelectOnlyItemsComponent;
  let fixture: ComponentFixture<SelectOnlyItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectOnlyItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOnlyItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
