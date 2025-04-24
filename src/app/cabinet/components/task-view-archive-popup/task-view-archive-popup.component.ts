import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { UserModel } from "@core/models/user.model";
import { TaskModel } from "@core/models/task.model";
import * as TaskActions from "@core/redux/task/task.actions";
import * as fromRoot from "@core/redux/index";
import { Store } from "@ngrx/store";
import { TaskViewComponent } from "@cabinet/components/task-view/task-view.component";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-task-view-archive-popup",
  templateUrl: "./task-view-archive-popup.component.html",
  styleUrls: ["./task-view-archive-popup.component.less"],
  imports: [DatePipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskViewArchivePopupComponent implements OnInit {
  @Input() task: TaskModel;

  constructor(
    private store: Store<fromRoot.State>,
    private taskViewComponent: TaskViewComponent
  ) {}

  ngOnInit() {}

  onRevert() {
    this.task.isComplete = false;
    this.task.isArchive = false;
    this.store.dispatch(new TaskActions.SaveAction(this.task));
  }

  onArchive() {
    this.task.isArchive = true;
    this.store.dispatch(new TaskActions.ArchiveAction(this.task));
    this.taskViewComponent.onClose();
  }
}
