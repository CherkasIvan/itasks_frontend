import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { CabinetComponent } from "../../cabinet.component";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { InviteModel } from "@core/models/invite.model";
import { UserModel } from "@core/models/user.model";
import { StatusModel } from "@core/models/status.model";
import { TagModel } from "@core/models/tag.model";
import { FilterModel } from "@core/models/filter.model";
import * as fromRoot from "@core/redux/index";
import * as LayoutAction from "@core/redux/layout/layout.actions";
import { FilterStoreService } from "@core/services/store/filter.store.service";
import { combineLatest } from "rxjs";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-sidebar-filter",
  templateUrl: "./sidebar-filter.component.html",
  styleUrls: ["./sidebar-filter.component.less"],
  imports: [FormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarFilterComponent implements OnInit {
  users: UserModel[] = [];
  statuses: StatusModel[] = [];
  tags: TagModel[] = [];
  subscription$: Subscription = new Subscription();
  footerView: "default" | "saveFilter" = "default";
  /** Модель фильтров списка задач */
  filterModel: FilterModel = this.filterStoreService.getNewFilter();

  constructor(
    public cabinetComponent: CabinetComponent,
    private store: Store<fromRoot.State>,
    private filterStoreService: FilterStoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription$.add(
      this.store
        .pipe(select(fromRoot.getInviteActiveEntities))
        .subscribe((invites: InviteModel[]) => {
          this.users = [];
          invites.forEach((item: InviteModel) => {
            this.users.push(item.user);
          });
        })
    );

    this.subscription$.add(
      this.store
        .pipe(select(fromRoot.getStatusEntities))
        .subscribe((statuses: StatusModel[]) => (this.statuses = statuses))
    );

    this.subscription$.add(
      this.store
        .pipe(select(fromRoot.getTagEntities))
        .subscribe((tags: TagModel[]) => (this.tags = tags))
    );

    const selectFilter$ = this.store.pipe(select(fromRoot.getFilterSelect));
    const routeFilter$ = this.route.queryParams;

    this.subscription$.add(
      combineLatest(selectFilter$, routeFilter$).subscribe(
        ([selectFilter, routeFilter]) => {
          if (selectFilter) {
            this.filterModel = selectFilter;
          } else if (routeFilter) {
            this.filterModel =
              this.filterStoreService.getNewFilterByParams(routeFilter);
          } else {
            this.filterModel = this.filterStoreService.getNewFilter();
          }
        }
      )
    );
  }

  onChangeResponsible(value) {
    this.filterModel.responsibleIds.length = 0;
    if (Array.isArray(value)) {
      this.filterModel.responsibleIds.push(...value);
    } else if (value) {
      this.filterModel.responsibleIds.push(value);
    }
  }

  onChangeAuthor(value) {
    this.filterModel.authorIds.length = 0;
    if (Array.isArray(value)) {
      this.filterModel.authorIds.push(...value);
    } else if (value) {
      this.filterModel.authorIds.push(value);
    }
  }

  onChangeStatus(value) {
    this.filterModel.statusIds.length = 0;
    if (Array.isArray(value)) {
      this.filterModel.statusIds.push(...value);
    } else if (value) {
      this.filterModel.statusIds.push(value);
    }
  }

  onChangeTag(value) {
    this.filterModel.tagIds.length = 0;
    if (Array.isArray(value)) {
      this.filterModel.tagIds.push(...value);
    } else if (value) {
      this.filterModel.tagIds.push(value);
    }
  }

  onClose() {
    this.filterStoreService.selectFilter(null);
    this.store.dispatch(new LayoutAction.CloseSidebarFilter());
  }

  onSubmit() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.filterStoreService.getFilterByParamsForQueryParams(
        this.filterModel
      ),
    });
  }

  onResetFilter() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }

  onSaveFilter() {
    if (this.footerView === "default") {
      this.footerView = "saveFilter";
    } else {
      if (this.filterModel.id) {
        this.filterStoreService.saveFilter(this.filterModel);
        this.filterStoreService.selectFilter(null);
      } else {
        this.filterStoreService.createFilter(this.filterModel);
      }
      this.footerView = "default";
    }
  }
}
