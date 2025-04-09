import { NgStyle } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { StatusModel } from "@core/models/status.model";

@Component({
  selector: "ux-status",
  templateUrl: "./status.component.html",
  imports: [NgStyle],
  standalone: true,
  styleUrls: ["./status.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent {
  private _status: StatusModel;

  @Input()
  set status(value: StatusModel) {
    this._status = value;
  }

  get status(): StatusModel {
    return this._status;
  }
}
