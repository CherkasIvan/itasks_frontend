import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import * as fromRoot from "@core/redux";
import { Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import { TagModel } from "@core/models/tag.model";
import { SettingTagItemComponent } from "../setting-tag-item/setting-tag-item.component";

@Component({
  selector: "app-setting-tag-list",
  templateUrl: "./setting-tag-list.component.html",
  styleUrls: ["./setting-tag-list.component.less"],
  imports: [SettingTagItemComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingTagListComponent implements OnInit, OnDestroy {
  subscription$: Subscription = new Subscription();
  tags: TagModel[] = [];

  constructor(private store: Store<fromRoot.State>) {
    this.subscription$.add(
      store
        .pipe(select(fromRoot.getTagEntities))
        .subscribe((items) => (this.tags = items))
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
