import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { CabinetComponent } from "../../cabinet.component";
import { Subscription } from "rxjs";
import { ProjectModel } from "@core/models/project.model";
import * as PopupAction from "@core/redux/popup/popup.actions";
import * as fromRoot from "@core/redux/index";
import * as ProjectAction from "@core/redux/project/project.actions";

@Component({
  selector: "app-project-menu",
  templateUrl: "./project-menu.component.html",
  styleUrls: ["./project-menu.component.less"],
  standalone: true,
})
export class ProjectMenuComponent implements OnInit, OnDestroy {
  subscription$: Subscription = new Subscription();
  model: ProjectModel;
  statusDeleteConfirm = 0;

  constructor(private store: Store<fromRoot.State>) {
    this.subscription$.add(
      store
        .pipe(select(fromRoot.getProjectSelectedEntityForUpdate))
        .subscribe((model) => (this.model = model))
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onClose() {
    this.store.dispatch(new PopupAction.CloseProjectMenu());
    this.store.dispatch(new ProjectAction.SelectUpdateAction(null));
  }

  onDelete() {
    ++this.statusDeleteConfirm;
    if (this.statusDeleteConfirm === 2) {
      this.store.dispatch(new ProjectAction.DeleteAction(this.model));
      this.onClose();
    }
  }

  onRestore() {
    this.store.dispatch(new ProjectAction.RestoreAction(this.model));
    this.onClose();
  }

  onOpenEditForm($event) {
    let position = 0;
    const popupHeight = 295;
    const halfPopupHeight = popupHeight / 2;
    const screenHeight = window.innerHeight;
    const topHeight = $event.pageY;
    const bottomHeight = screenHeight - topHeight;

    if (halfPopupHeight <= topHeight && halfPopupHeight <= bottomHeight) {
      position = topHeight - halfPopupHeight;
    } else if (halfPopupHeight > topHeight) {
      position = 15;
    } else if (halfPopupHeight > bottomHeight) {
      position = screenHeight - popupHeight - 15;
    }
    this.store.dispatch(new PopupAction.OpenProjectFormMenu(position, 440));
  }
}
