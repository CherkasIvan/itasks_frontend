import {Component, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import * as _ from 'lodash';
import {ValueAccessorBase} from '@core/element/value-accessor.class';

@Component({
  selector: 'ux-select-only',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: SelectOnlyComponent, multi: true}
  ],
})
export class SelectOnlyComponent extends ValueAccessorBase<string> implements OnInit {
  @Input() items = [];
  @Input() valueFiled = 'name';
  @Input() idFiled = 'name';
  @Input() emptyText = 'Не выбрано';

  isOpen = false;
  selectedItem = {};

  constructor() {
    super();
  }

  ngOnInit() {
    this.setSelectedItem();
  }

  select(item) {
    this.value = item[this.idFiled];
    this.setSelectedItem();
    this.close();

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

  writeValue(value: string) {
    super.writeValue(value);
    this.setSelectedItem();
  }

  protected setSelectedItem() {
    const find = this.items.filter((item) => item[this.idFiled] === this.value);
    this.selectedItem = find.length ? find[0] : {};
  }
}
