import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';
import * as fromRoot from '@core/redux';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {TagModel} from '@core/models/tag.model';
import {UserModel} from '@core/models/user.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ux-popup-tag',
  templateUrl: './popup-tag.component.html',
  styleUrls: ['./popup-tag.component.less']
})
export class PopupTagComponent implements OnInit, OnDestroy {
  @Input() multiple = false;
  @Output() selectItem = new EventEmitter<TagModel>();
  @Output() changeItems = new EventEmitter<string[]>();

  subscription$: Subscription = new Subscription;

  private _value: any;

  @Input()
  set value(value) {
    this._value = value;
  }

  get value(): any {
    return this._value;
  }

  items: TagModel[] = [];
  match: string;
  selectIndex = -1;
  isAdmin = false;

  constructor(private store: Store<fromRoot.State>,
              private router: Router,
              private route: ActivatedRoute) {
    this.subscription$.add(store
      .pipe(select(fromRoot.getTagEntities))
      .subscribe((items) => this.items = items));
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    this.subscription$
      .add(this
        .store
        .pipe(select(fromRoot.getUserCanAdmin))
        .subscribe((isAdmin: boolean) => {
          this.isAdmin = isAdmin || false;
        }));
  }

  hasSelected(id: string) {
    if (this.multiple) {
      return _.indexOf(this.value, id) > -1;
    } else {
      return this.value === id;
    }
  }

  onSelect(item) {
    if (this.multiple) {
      const index = _.indexOf(this.value, item.id);
      if (index > -1) {
        this.value.splice(index, 1);
      } else {
        this.value.push(item.id);
      }
    } else {
      this.value = item.id;
    }
    this.selectItem.emit(item);
    this.changeItems.emit(this._value);
  }

  onArrowUp() {
    let selectIndex = this.selectIndex;
    --selectIndex;

    if (selectIndex < 0) {
      selectIndex = this.items.length - 1;
    }

    this.selectIndex = selectIndex;
  }

  onArrowDown() {
    let selectIndex = this.selectIndex;
    ++selectIndex;

    if (selectIndex > this.items.length - 1) {
      selectIndex = 0;
    }

    this.selectIndex = selectIndex;
  }

  onOpenSettings() {
    this.router.navigate([{outlets: {popup: ['settings', 'tag']}}], {
      relativeTo: this.route.parent,
      queryParamsHandling: 'merge'
    });
  }
}
