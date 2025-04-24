import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";
import { SelectComponent } from "../select.component";
import { NgClass } from "@angular/common";

@Component({
  selector: "ux-select-header-user",
  templateUrl: "./select-header-user.component.html",
  styleUrls: ["./select-header-user.component.less"],
  imports: [NgClass],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectHeaderUserComponent implements OnInit {
  @Input() icon: string;
  @Input() placeholder: string;

  constructor(public selectComponent: SelectComponent) {}

  ngOnInit() {}
}
