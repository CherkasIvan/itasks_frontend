import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingTagItemComponent } from './setting-tag-item.component';

describe('SettingTagItemComponent', () => {
  let component: SettingTagItemComponent;
  let fixture: ComponentFixture<SettingTagItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingTagItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingTagItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
