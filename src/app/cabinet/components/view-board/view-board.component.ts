import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from "@core/redux";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { CabinetComponent } from "@cabinet/cabinet.component";
import { FilterControlsComponent } from "../filter-controls/filter-controls.component";
import { BoardComponent } from "../board/board.component";

@Component({
  selector: "app-view-board",
  templateUrl: "./view-board.component.html",
  standalone: true,
  imports: [FilterControlsComponent, BoardComponent],
  styleUrls: ["./view-board.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewBoardComponent implements OnInit, OnDestroy {
  private _subscriptions$: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private cabinetComponent: CabinetComponent
  ) {
    this.cabinetComponent.layout = "board";
  }

  ngOnInit() {}

  ngOnDestroy() {
    this._subscriptions$.unsubscribe();
  }
}
