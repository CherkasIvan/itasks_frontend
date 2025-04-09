import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-select-icon",
  templateUrl: "./select-icon.component.html",
  styleUrls: ["./select-icon.component.less"],
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectIconComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
