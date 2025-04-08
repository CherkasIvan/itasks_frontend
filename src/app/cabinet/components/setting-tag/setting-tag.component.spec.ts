import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingTagComponent } from './setting-tag.component';

describe('SettingTagComponent', () => {
  let component: SettingTagComponent;
  let fixture: ComponentFixture<SettingTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
