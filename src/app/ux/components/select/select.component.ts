import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'ux-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})

export class SelectComponent implements OnInit {
  @Input() items = [];
  @Output() onSelect = new EventEmitter<string[]>();

  selectedModel = [];
  isOpen = false;
  filter;
  private _value;

  @Input()
  set value(value) {
    this._value = value;
    this._initSelectedItems();
  }

  get value() {
    return this._value;
  }

  constructor() {
  }

  ngOnInit() {
  }

  select(item) {
    const index = _.findIndex(this.selectedModel, {id: item.id});

    if (index === -1) {
      this.selectedModel.push(item);
    } else {
      this.selectedModel.splice(index, 1);
    }
    this.onSelect.emit(this.value);
  }

  open() {
    this.isOpen = true;

  }

  close() {
    this.isOpen = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  private _initSelectedItems() {
    this.selectedModel = [];
    if (Array.isArray(this._value)) {
      this._value = this._value.slice();
      this._value.forEach((id) => {
        this.select(_.find(this.items, {id: id as any}));
      });
    } else {
      this.select(_.find(this.items, {id: this._value as any}));
      this._value = [this._value];
    }
  }
}
