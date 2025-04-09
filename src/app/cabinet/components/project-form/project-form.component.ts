import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import { ProjectModel } from "@core/models/project.model";
import { Subscription } from "rxjs";
import * as fromRoot from "@core/redux/index";
import * as ProjectAction from "@core/redux/project/project.actions";
import * as PopupAction from "@core/redux/popup/popup.actions";
import { SelectColorComponent } from "../select-color/select-color.component";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-project-form",
  templateUrl: "./project-form.component.html",
  styleUrls: ["./project-form.component.less"],
  imports: [SelectColorComponent, FormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  model: ProjectModel = new ProjectModel();
  isSending = false;
  subscription$: Subscription = new Subscription();

  constructor(private store: Store<fromRoot.State>) {
    this.subscription$.add(
      store
        .pipe(select(fromRoot.getProjectSelectedEntityForUpdate))
        .subscribe((model) => {
          this.model = Object.assign({}, model);
        })
    );

    this.subscription$.add(
      store.pipe(select(fromRoot.getProjectLoading)).subscribe((isSending) => {
        return (this.isSending = isSending);
      })
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onClose(event) {
    event.stopPropagation();
    this.store.dispatch(new PopupAction.CloseProjectFormMenu());
  }

  onSubmit(event) {
    event.stopPropagation();
    if (this.model.id !== undefined) {
      this.store.dispatch(new ProjectAction.SaveAction(this.model));
    } else {
      this.store.dispatch(new ProjectAction.CreateAction(this.model));
    }
  }

  onChangeColor(color) {
    this.model.color = color;
  }
}
