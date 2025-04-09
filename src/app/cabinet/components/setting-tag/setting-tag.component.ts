import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { SettingTagListComponent } from "./setting-tag-list/setting-tag-list.component";

@Component({
  selector: "app-setting-tag",
  templateUrl: "./setting-tag.component.html",
  styleUrls: ["./setting-tag.component.less"],
  imports: [SettingTagListComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingTagComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
