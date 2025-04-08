import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '@core/redux';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {CabinetComponent} from '@cabinet/cabinet.component';

@Component({
  selector: 'app-view-board',
  templateUrl: './view-board.component.html',
  styleUrls: ['./view-board.component.less']
})
export class ViewBoardComponent implements OnInit, OnDestroy {
  private _subscriptions$: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,
              private store: Store<fromRoot.State>,
              private cabinetComponent: CabinetComponent) {
    this.cabinetComponent.layout = 'board';
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._subscriptions$.unsubscribe();
  }
}
