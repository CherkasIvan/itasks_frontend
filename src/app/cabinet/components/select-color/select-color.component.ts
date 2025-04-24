import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";

@Component({
  selector: "app-select-color",
  templateUrl: "./select-color.component.html",
  styleUrls: ["./select-color.component.less"],
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectColorComponent implements OnInit {
  @Output() onChangeColor = new EventEmitter<string>();
  @Input() color: string;

  cssClasses = [
    { color: "#29e4d3", cssClass: "select-color__item-color_bg-1" },
    { color: "#42e3f0", cssClass: "select-color__item-color_bg-2" },
    { color: "#5fb0ff", cssClass: "select-color__item-color_bg-3" },
    { color: "#995ec9", cssClass: "select-color__item-color_bg-4" },
    { color: "#ff7ea4", cssClass: "select-color__item-color_bg-5" },
    { color: "#ffdea2", cssClass: "select-color__item-color_bg-6" },
    { color: "#a4e279", cssClass: "select-color__item-color_bg-7" },
    { color: "#dfe3a3", cssClass: "select-color__item-color_bg-8" },
    { color: "#afc6e5", cssClass: "select-color__item-color_bg-9" },
    { color: "#9eadba", cssClass: "select-color__item-color_bg-10" },
    { color: "#f75d5d", cssClass: "select-color__item-color_bg-11" },
    { color: "#ff9c63", cssClass: "select-color__item-color_bg-12" },
  ];

  constructor() {}

  ngOnInit() {}
}
