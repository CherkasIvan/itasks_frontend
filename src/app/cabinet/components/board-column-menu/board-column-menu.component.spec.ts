import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardColumnMenuComponent } from './board-column-menu.component';

describe('BoardColumnMenuComponent', () => {
  let component: BoardColumnMenuComponent;
  let fixture: ComponentFixture<BoardColumnMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardColumnMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardColumnMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
