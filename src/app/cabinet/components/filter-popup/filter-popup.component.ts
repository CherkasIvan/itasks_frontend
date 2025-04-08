import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '@core/redux';
import {FilterModel} from '@core/models/filter.model';
import {ActivatedRoute, Router} from '@angular/router';
import * as LayoutAction from '@core/redux/layout/layout.actions';
import * as FilterAction from '@core/redux/filter/filter.actions';
import {FilterStoreService} from '@core/services/store/filter.store.service';

@Component({
  selector: 'filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.less']
})
export class FilterPopupComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  subscription$: Subscription = new Subscription;
  filters: FilterModel[] = [];
  filteredFilters: FilterModel[] = [];

  constructor(private store: Store<fromRoot.State>,
              private filterStoreService: FilterStoreService,
              private router: Router,
              private route: ActivatedRoute) {
    this.subscription$.add(this
      .store
      .pipe(select(fromRoot.getFilterEntities))
      .subscribe((filters) => {
        this.filters = filters;
        this.filteredFilters = filters;
      }));
  }

  ngOnInit() {
  }

  onEdit(filter: FilterModel) {
    this.filterStoreService.selectFilter(filter.id);
    this.store.dispatch(new LayoutAction.OpenSidebarFilter());
  }

  onDelete(filter: FilterModel) {
    this.filterStoreService.selectFilter(null);
    this.filterStoreService.deleteFilter(filter);
  }

  /**
   * Открыть фильтр (сайдбар)
   */
  onOpenSidebar() {
    this.store.dispatch(new LayoutAction.OpenSidebarFilter());
    this.onClose.emit();
  }

  onSubmitFilter(filter: FilterModel) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.filterStoreService.getFilterByParamsForQueryParams(filter)
    });
    this.onClose.emit();
  }

  onFilterItems(search: string) {
    this.filteredFilters = this.filters.filter((item) => {
      return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }
}
