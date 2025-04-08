import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '@core/models/user.model';

@Component({
  selector: 'ux-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  @Input() user: UserModel;

  constructor() {
  }

  ngOnInit() {
  }
}
