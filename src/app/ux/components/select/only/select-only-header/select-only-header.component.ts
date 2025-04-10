import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { SelectOnlyComponent } from "../select-only/select.component";
import { NgClass } from "@angular/common";

@Component({
  selector: "ux-select-only-header",
  templateUrl: "./select-only-header.component.html",
  styleUrls: ["./select-only-header.component.less"],
  imports: [NgClass],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOnlyHeaderComponent implements OnInit {
  constructor(public selectOnlyComponent: SelectOnlyComponent) {}

  ngOnInit() {}
}
