import { NgClass } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";

@Component({
  selector: "ux-context-menu-item",
  templateUrl: "./context-menu-item.component.html",
  styleUrls: ["./context-menu-item.component.less"],
  imports: [NgClass],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuItemComponent implements OnInit {
  @Input() isSelectFile = false;
  @Input() icon: string;
  @Input() iconSize: string;
  @Input() iconColor: string;
  @Input() name: string;
  @Output() onSelectFile = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}
}
