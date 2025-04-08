import {Component, OnInit, Input} from '@angular/core';
import {SelectComponent} from '../select.component';

@Component({
  selector: 'ux-select-header-user',
  templateUrl: './select-header-user.component.html',
  styleUrls: ['./select-header-user.component.less']
})
export class SelectHeaderUserComponent implements OnInit {
  @Input() icon: string;
  @Input() placeholder: string;

  constructor(public selectComponent: SelectComponent) {
  }

  ngOnInit() {
  }
}
