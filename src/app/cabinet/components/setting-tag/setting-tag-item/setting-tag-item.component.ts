import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {TagModel} from '@core/models/tag.model';
import * as TagActions from '@core/redux/tag/tag.actions';
import * as fromRoot from '@core/redux';
import {TagComponent} from '@ux/components/tag/tag.component';

@Component({
  selector: 'app-setting-tag-item',
  templateUrl: './setting-tag-item.component.html',
  styleUrls: ['./setting-tag-item.component.less']
})
export class SettingTagItemComponent implements OnInit {
  @Input() isNew = false;
  @Input() tag: TagModel;

  tagCopy: TagModel;
  @ViewChild(TagComponent) tagComponent: TagComponent;
  cssClasses = [
    {'color': '#42e3f0', 'cssClassApi': 'tag_bg-1', 'cssClass': 'setting-tag-item__color_bg-1'},
    {'color': '#5fb0ff', 'cssClassApi': 'tag_bg-3', 'cssClass': 'setting-tag-item__color_bg-3'},
    {'color': '#995ec9', 'cssClassApi': 'tag_bg-4', 'cssClass': 'setting-tag-item__color_bg-4'},
    {'color': '#ff7ea4', 'cssClassApi': 'tag_bg-5', 'cssClass': 'setting-tag-item__color_bg-5'},
    {'color': '#ffdea2', 'cssClassApi': 'tag_bg-6', 'cssClass': 'setting-tag-item__color_bg-6'},
    {'color': '#a4e279', 'cssClassApi': 'tag_bg-7', 'cssClass': 'setting-tag-item__color_bg-7'},
    {'color': '#dfe3a3', 'cssClassApi': 'tag_bg-8', 'cssClass': 'setting-tag-item__color_bg-8'},
  ];

  isEditMode = false;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    if (this.isNew) {
      this._clearForm();
    } else {
      this._copyModel();
    }
  }

  onSave() {
    if (this.tagCopy.cssClass && this.tagCopy.name) {
      this.tag = Object.assign({}, this.tagCopy);
      if (this.isNew) {
        this.store.dispatch(new TagActions.CreateAction(this.tag));
        this._clearForm();
      } else {
        this.store.dispatch(new TagActions.SaveAction(this.tag));
      }
    }
  }

  onFocus() {
    this.isEditMode = true;
  }

  onBlur() {
    if (this.tagCopy.name !== this.tag.name) {
      this.onSave();
    }
    this.isEditMode = false;
  }

  onDelete() {
    this.store.dispatch(new TagActions.DeleteAction(this.tag));
  }

  onChangeCssClass(cssClass) {
    this.tagCopy.cssClass = cssClass;
    this.tagComponent.onChangeCssClass(cssClass);
    this.onSave();
  }

  protected _copyModel() {
    this.tagCopy = Object.assign({}, this.tag);
  }

  protected _clearForm() {
    this.tag = new TagModel();
    this.tag.cssClass = 'tag_bg-1';
    this._copyModel();
  }
}
