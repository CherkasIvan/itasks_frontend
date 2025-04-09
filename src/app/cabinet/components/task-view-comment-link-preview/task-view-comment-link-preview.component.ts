import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-task-view-comment-link-preview",
  templateUrl: "./task-view-comment-link-preview.component.html",
  styleUrls: ["./task-view-comment-link-preview.component.less"],
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskViewCommentLinkPreviewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
