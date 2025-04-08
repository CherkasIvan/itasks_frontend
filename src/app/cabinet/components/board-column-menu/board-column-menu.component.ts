import {Component, Input, OnInit} from '@angular/core';
import {StatusModel} from '@core/models/status.model';
import * as fromRoot from '@core/redux';
import {Store} from '@ngrx/store';
import * as StatusActions from '@core/redux/status/status.actions';

@Component({
  selector: 'app-board-column-menu',
  templateUrl: './board-column-menu.component.html',
  styleUrls: ['./board-column-menu.component.less']
})
export class BoardColumnMenuComponent implements OnInit {
  @Input() model: StatusModel;
  confirmDelete = false;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
  }

  onDelete() {
    if (this.confirmDelete) {
      this.store.dispatch(new StatusActions.DeleteAction(this.model));
      this.confirmDelete = false;
    } else {
      this.confirmDelete = true;
    }
  }

  onChangeColor(color) {
    if (color !== this.model.color) {
      this.model.color = color;
      this.store.dispatch(new StatusActions.SaveAction(this.model));
    }
  }
}
