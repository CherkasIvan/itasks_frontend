import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, pluck } from "rxjs/operators";
import { Subscription } from "rxjs";
import { NgStyle, NgSwitch } from "@angular/common";

type ActiveTabs = "tag" | "user";

@Component({
  selector: "app-settings-popup",
  templateUrl: "./settings-popup.component.html",
  styleUrls: ["./settings-popup.component.less"],
  imports: [NgStyle, NgSwitch],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPopupComponent
  implements OnInit, OnDestroy, AfterContentChecked
{
  private _subscriptions$: Subscription = new Subscription();
  activeTab: ActiveTabs = "user";

  /**
   * headerActiveLineLeft - изменяет положение по левому краю ползунка
   * @type {number}
   */
  headerActiveLineLeft: Number;
  /**
   * headerActiveLineWidth - изменяет длину ползунка относительно длины выбранного элемента
   * @type {number}
   */
  headerActiveLineWidth: Number;

  constructor(public router: Router, private route: ActivatedRoute) {}

  /**
   *
   */
  onClose() {
    this.router.navigate([{ outlets: { popup: null } }], {
      relativeTo: this.route.parent,
    });
  }

  /**
   *
   */
  ngOnInit() {
    this._subscribeParams();
  }

  ngAfterContentChecked() {
    this.onChangePositionActive();
  }

  ngOnDestroy() {
    this._subscriptions$.unsubscribe();
  }

  /**
   *
   * @param {MouseEvent} event
   * @param tab
   */
  onChangeTab(event: MouseEvent, tab) {
    this.router.navigate([{ outlets: { popup: ["settings", tab] } }], {
      relativeTo: this.route.parent,
      queryParamsHandling: "merge",
    });
  }

  /**
   *
   * @private
   */
  private _subscribeParams() {
    this._subscriptions$.add(
      this.route.params
        .pipe(
          pluck("tab"),
          filter((tab: ActiveTabs) => !!tab)
        )
        .subscribe((tab: ActiveTabs) => {
          this.activeTab = tab;
          this.onChangePositionActive();
        })
    );
  }

  private onChangePositionActive() {
    const element: HTMLElement = document.getElementsByClassName(
      "settings-popup__tab_active"
    )[0] as HTMLElement;
    if (element) {
      this.headerActiveLineWidth = element.clientWidth;
      this.headerActiveLineLeft = element.offsetLeft;
    }
  }
}
