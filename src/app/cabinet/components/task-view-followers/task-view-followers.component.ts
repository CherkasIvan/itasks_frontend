import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CabinetComponent } from "../../cabinet.component";
import { TaskViewComponent } from "../task-view/task-view.component";
import { UserModel } from "@core/models/user.model";
import * as _ from "lodash";

@Component({
  selector: "app-task-view-followers",
  templateUrl: "./task-view-followers.component.html",
  styleUrls: ["./task-view-followers.component.less"],
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskViewFollowersComponent implements OnInit {
  isOpenPopup = false;

  constructor(public taskViewComponent: TaskViewComponent) {}

  ngOnInit() {}

  onOpen() {
    this.isOpenPopup = true;
  }

  onClose() {
    this.isOpenPopup = false;
  }

  onToggle() {
    this.isOpenPopup = !this.isOpenPopup;
  }

  onDeleteFollower(user: UserModel) {
    const followerIndex = this.taskViewComponent.task.followers.indexOf(
      user.id
    );
    if (followerIndex > -1) {
      this.taskViewComponent.task.followers.splice(followerIndex, 1);
      this.taskViewComponent.onSave();
    }
  }

  onChangeFollowers(followers) {
    this.taskViewComponent.task.followers = followers;
    this.taskViewComponent.onSave();
  }
}
