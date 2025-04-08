import { Component, OnInit } from '@angular/core';
import {SelectOnlyComponent} from '../select-only/select.component';

@Component({
  selector: 'ux-select-only-header',
  templateUrl: './select-only-header.component.html',
  styleUrls: ['./select-only-header.component.less']
})
export class SelectOnlyHeaderComponent implements OnInit {

  constructor(public selectOnlyComponent: SelectOnlyComponent) {
  }

  ngOnInit() {
  }

}
