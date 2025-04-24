import { OnDestroy, Pipe, PipeTransform } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromRoot from "@core/redux";
import { environment } from "../../../environments/environment";
import { Subscription } from "rxjs";
import { filter } from "rxjs";

const API_URL = environment.apiUrl;

@Pipe({ name: "imagePreview" })
export class ImagePreviewPipe implements PipeTransform, OnDestroy {
  projectId: string;
  accessToken: string;
  subscription$: Subscription = new Subscription();

  constructor(private store: Store<fromRoot.State>) {
    if (!this.projectId) {
      this.subscription$.add(
        store
          .pipe(select(fromRoot.getProjectSelectedId))
          .subscribe((id) => (this.projectId = id))
      );
    }

    if (!this.accessToken) {
      this.subscription$.add(
        this.store
          .pipe(
            select(fromRoot.getToken),
            filter((token) => !!token)
          )

          .subscribe((token) => {
            this.accessToken = token;
          })
      );
    }
  }

  transform(
    value: any,
    width: number | boolean,
    height: number | boolean,
    isAvatar: boolean = false
  ): string {
    let url = `${API_URL}files/`;

    if (isAvatar) {
      url = `${API_URL}files/view-avatar/${width}/${height}/${value.id}.png`;
    } else {
      url = `${API_URL}files/${value.id}?projectId=${this.projectId}&access-token=${this.accessToken}`;

      if (width) {
        url += `&width=${width}`;
      }
      if (height) {
        url += `&height=${height}`;
      }
    }

    return url;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
