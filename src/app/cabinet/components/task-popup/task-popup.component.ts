import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { TaskViewComponent } from "../task-view/task-view.component";

@Component({
  selector: "app-task-popup",
  templateUrl: "./task-popup.component.html",
  styleUrls: ["./task-popup.component.less"],
  imports: [TaskViewComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPopupComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
