import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as StatusAction from "@core/redux/status/status.actions";
import * as fromRoot from "@core/redux";
import { StatusModel } from "@core/models/status.model";
import { CabinetComponent } from "../../cabinet.component";
import { StatusSortModel } from "@core/models/status-sort.model";
import { Subscription } from "rxjs";
import * as TaskActions from "@core/redux/task/task.actions";
import { ActivatedRoute } from "@angular/router";
import { map, filter } from "rxjs/operators"; // Импортируйте необходимые операторы

declare var jQuery: any;

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.less"],
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit, AfterViewInit, OnDestroy {
  isAdmin = false;
  isShowBacklog = false;
  isSortableInit = false;
  subscription$: Subscription = new Subscription();

  constructor(
    private store: Store<fromRoot.State>,
    private elementRef: ElementRef,
    public cabinetComponent: CabinetComponent,
    private route: ActivatedRoute
  ) {
    this.subscription$.add(
      store
        .pipe(select(fromRoot.getShowBackLog))
        .subscribe((isShowBacklog) => (this.isShowBacklog = isShowBacklog))
    );

    this.subscription$.add(
      route.params
        .pipe(
          map((params) => params.taskId), // Используйте map вместо pluck
          filter((taskId) => !!taskId)
        )
        .subscribe((taskId: string) =>
          this.store.dispatch(new TaskActions.OpenAction(taskId))
        )
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    this._destroySortable();
  }

  ngAfterViewInit() {
    this.subscription$.add(
      this.store
        .pipe(select(fromRoot.getUserCanAdmin))
        .subscribe((isAdmin: boolean) => {
          setTimeout(() => {
            isAdmin = isAdmin || false;
            if (isAdmin) {
              this._initSortable();
            } else {
              this._destroySortable();
            }
            this.isAdmin = isAdmin;
          });
        })
    );
  }

  onCreateNewStatus() {
    const model = new StatusModel();
    model.name = "Новый статус";
    this.store.dispatch(new StatusAction.CreateAction(model));
  }

  private _initSortable() {
    jQuery(this.elementRef.nativeElement).sortable({
      items: "> .board__column:gt(0)",
      handle: ".board-column__dd",
      placeholder: "column-placeholder",
      dropOnEmpty: true,
      tolerance: "pointer",
      axis: "x",
      update: () => {
        const statusSort = new StatusSortModel();
        const elements =
          this.elementRef.nativeElement.getElementsByClassName("board__column");
        for (let i = 0; i < elements.length; i++) {
          statusSort.id.push(elements[i].getAttribute("statusid"));
        }
        this.store.dispatch(new StatusAction.SortAction(statusSort));
      },
    });
    this.isSortableInit = true;
  }

  private _destroySortable() {
    if (this.isSortableInit) {
      this.isSortableInit = false;
      jQuery(this.elementRef.nativeElement).sortable("destroy");
    }
  }
}
