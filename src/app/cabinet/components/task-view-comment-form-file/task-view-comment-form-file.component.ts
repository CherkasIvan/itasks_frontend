import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { TaskViewCommentsFormComponent } from "../task-view-comments-form/task-view-comments-form.component";
import { PreviewFileComponent } from "@ux/components/preview-file/preview-file.component";
import { UploadImageComponent } from "@ux/components/upload-image/upload-image.component";

@Component({
  selector: "app-task-view-comment-form-file",
  templateUrl: "./task-view-comment-form-file.component.html",
  styleUrls: ["./task-view-comment-form-file.component.less"],
  imports: [PreviewFileComponent, UploadImageComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskViewCommentFormFileComponent implements OnInit {
  constructor(
    public taskViewCommentsFormComponent: TaskViewCommentsFormComponent
  ) {}

  ngOnInit() {}
}
