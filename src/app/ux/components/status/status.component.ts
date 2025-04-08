import {Component, Input} from '@angular/core';
import {StatusModel} from '@core/models/status.model';

@Component({
  selector: 'ux-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less']
})
export class StatusComponent {
  private _status: StatusModel;

  @Input()
  set status(value: StatusModel) {
    this._status = value;
  }

  get status(): StatusModel {
    return this._status;
  }
}
