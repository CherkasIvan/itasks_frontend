import {Component, OnInit} from '@angular/core';
import {SelectOnlyComponent} from '../select-only/select.component';

@Component({
  selector: 'ux-select-only-items',
  templateUrl: './select-only-items.component.html',
  styleUrls: ['./select-only-items.component.less']
})
export class SelectOnlyItemsComponent implements OnInit {

  constructor(public selectOnlyComponent: SelectOnlyComponent) {
  }

  ngOnInit() {
  }
}
