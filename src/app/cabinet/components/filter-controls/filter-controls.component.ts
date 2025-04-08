import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {FilterStoreService} from '@core/services/store/filter.store.service';
import {CabinetComponent} from '../../cabinet.component';

@Component({
  selector: 'app-filter-controls',
  templateUrl: './filter-controls.component.html',
  styleUrls: ['./filter-controls.component.less']
})
export class FilterControlsComponent implements OnDestroy {

  /** Включена ли фильтрация */
  isFilteringEnabled = false;

  /**
   * Показывать ли попап фильтров
   * @type {boolean}
   */
  isShowFilterPopup = false;


  /** Подписки */
  subscription$: Subscription = new Subscription();

  /**
   *
   * @param {CabinetComponent} cabinetComponent
   * @param filterStoreService
   * @param {Store<State>} store
   * @param {Router} router
   * @param {ActivatedRoute} route
   */
  constructor(public cabinetComponent: CabinetComponent,
              private filterStoreService: FilterStoreService,
              private router: Router,
              private route: ActivatedRoute) {
    // Подписываемся на роутинг
    this
      .subscription$
      .add(route
        .queryParams
        .subscribe((params: Params) => {
          this.isFilteringEnabled =
            !!params['responsibleId']
            || !!params['authorId']
            || !!params['tagId']
            || !!params['statusId']
            || !!params['text']
          ;
        }));
  }

  /**
   * Отписываемся от всех подписок
   */
  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  /**
   * Открыть попап фильтров
   */
  onToggleFilterPopup() {
    this.isShowFilterPopup = !this.isShowFilterPopup;
  }

  /**
   * Закрыть попап фильтров
   */
  onCloseFilterPopup() {
    this.isShowFilterPopup = false;
  }

  /**
   * Сбросить фильтр
   */
  onClearFilter() {
    this.filterStoreService.selectFilter(null);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }
}
