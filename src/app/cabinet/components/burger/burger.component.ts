import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from '@core/redux';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.less']
})
export class BurgerComponent implements OnInit, OnDestroy {
  subscription$: Subscription = new Subscription;
  count = 0;

  constructor(private store: Store<fromRoot.State>) {
    this.subscription$.add(store
      .pipe(select(fromRoot.getNotificationsTask))
      .subscribe((tasks) => {
        this.count = 0;
        if (tasks) {
          tasks.forEach((task) => {
            this.count += task.countNotifications;
          });
        }
      }));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
