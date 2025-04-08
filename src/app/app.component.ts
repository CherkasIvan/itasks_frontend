import {Component, OnDestroy, OnInit, Self} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from './core/redux/index';
import {Subscription} from 'rxjs/Subscription';
import {IdentityModel} from '@core/models/identity.model';
import {DeviceDetectorService} from 'ngx-device-detector';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [NgClass],

})
export class AppComponent implements OnDestroy, OnInit {
  title = 'app';
  subscription$: Subscription = new Subscription;
  userIdentity: IdentityModel;

  constructor(@Self() private ngClass: NgClass,
              private store: Store<fromRoot.State>,
              private deviceService: DeviceDetectorService) {
    this.subscription$.add(this.store
      .pipe(select(fromRoot.getUser))
      .subscribe((user: IdentityModel) => this.userIdentity = user));

  }

  ngOnInit() {
    if (this.deviceService.os !== 'mac' && this.deviceService.os !== 'android') {
      this.ngClass.ngClass = 'no-mac';
      this.ngClass.ngDoCheck();
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
