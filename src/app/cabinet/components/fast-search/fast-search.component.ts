import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {debounceTime, distinctUntilChanged, map, pluck} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-fast-search',
  templateUrl: './fast-search.component.html',
  styleUrls: ['./fast-search.component.less']
})
export class FastSearchComponent implements OnInit, OnDestroy {
  private _subscriptions$: Subscription = new Subscription();
  private _subscriptionRoute$: Subscription = new Subscription();
  keyUp$ = new Subject<any>();

  text: string;
  isUnsubscribeChangeRoute = false;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this._subscribeRoute();
    this._subscribeKeyUp();
  }

  ngOnDestroy() {
    this._subscriptions$.unsubscribe();
    this._subscriptionRoute$.unsubscribe();
  }

  private _subscribeKeyUp() {
    this._subscriptions$.add(this.keyUp$
      .pipe(
        map(event => event.target.value),
        debounceTime(200),
        distinctUntilChanged()
      ).subscribe(data => {
        if (!this.isUnsubscribeChangeRoute) {
          this._subscriptionRoute$.unsubscribe();
          this.isUnsubscribeChangeRoute = true;
        }

        this.router.navigate([], {
          queryParams: {
            text: data
          },
          queryParamsHandling: 'merge'
        });
      }));

    this._subscriptions$.add(this.keyUp$
      .pipe(
        debounceTime(3000),
        distinctUntilChanged()
      ).subscribe(() => {
        if (this.isUnsubscribeChangeRoute) {
          this._subscribeRoute();
        }
      }));
  }

  private _subscribeRoute() {
    this.isUnsubscribeChangeRoute = false;
    this._subscriptionRoute$ = this
      .route
      .queryParams
      .pipe(
        pluck('text')
      )
      .subscribe((text: string) => {
        this.text = text;
      });
  }
}
