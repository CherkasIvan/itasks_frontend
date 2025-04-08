import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingTagListComponent } from './setting-tag-list.component';

describe('SettingTagListComponent', () => {
  let component: SettingTagListComponent;
  let fixture: ComponentFixture<SettingTagListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingTagListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingTagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
