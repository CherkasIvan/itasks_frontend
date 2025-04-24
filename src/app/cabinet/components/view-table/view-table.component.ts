import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import "rxjs/add/operator/pluck";
import * as TaskActions from "@core/redux/task/task.actions";
import { Store } from "@ngrx/store";
import * as fromRoot from "@core/redux/index";
import { CabinetComponent } from "@cabinet/cabinet.component";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-view-table",
  templateUrl: "./view-table.component.html",
  imports: [NgClass],
  standalone: true,
  styleUrls: ["./view-table.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTableComponent implements OnInit, OnDestroy {
  subscription$: Subscription = new Subscription();

  /** ID открытой задачи **/
  id: number;

  /** Открыт ли сайдбар задачи **/
  isOpenTask = false;

  /** Офсет при подгрузке задач */
  offset = 0;

  /** Лимит загрузки задач за раз */
  limit = 20;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private cabinetComponent: CabinetComponent
  ) {
    this.cabinetComponent.layout = "table";
  }

  ngOnInit() {
    this._subscribeParams();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onParticleLoad() {
    this.offset += this.limit;
  }

  private _subscribeParams() {
    this.subscription$.add(
      this.route.queryParams.subscribe((params) => {
        this._toggleTask(params["id"]);
      })
    );
  }

  private _toggleTask(id) {
    this.id = id || null;
    this.isOpenTask = !!this.id;
    this.store.dispatch(new TaskActions.OpenAction((this.id = id)));
  }
}
