import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as AuthActions from "@core/redux/auth/auth.actions";
import * as fromRoot from "@core/redux/index";
import { SignUpInterviewModel } from "@core/models/sign-up-interview.model";
import { FormsModule } from "@angular/forms";
import { SelectOnlyComponent } from "@ux/components/select/only/select-only/select.component";
import { SelectOnlyHeaderComponent } from "@ux/components/select/only/select-only-header/select-only-header.component";
import { SelectOnlyItemsComponent } from "@ux/components/select/only/select-only-items/select-only-items.component";

@Component({
  selector: "app-sign-up-step-3",
  templateUrl: "./sign-up-step-3.component.html",
  styleUrls: ["./sign-up-step-3.component.less"],
  imports: [
    FormsModule,
    SelectOnlyComponent,
    SelectOnlyHeaderComponent,
    SelectOnlyItemsComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpStep3Component implements OnInit {
  constructor(private store: Store<fromRoot.State>) {}

  model = new SignUpInterviewModel();

  listForWhat = [
    { name: "Работа" },
    { name: "Учеба" },
    { name: "Личные задачи" },
    { name: "Просто смотрю" },
    { name: "Другое" },
  ];

  listForPosition = [
    { name: "Директор" },
    { name: "Руководитель IT отдела" },
    { name: "Руководитель отдела продаж" },
    { name: "Сотрудник HR службы" },
    { name: "Руководитель по маркетингу" },
    { name: "Маркетолог" },
    { name: "Другая" },
  ];

  listForCountEmployees = [
    { name: "1-5" },
    { name: "6-15" },
    { name: "16-25" },
    { name: "26-50" },
    { name: "50+" },
  ];

  ngOnInit() {}

  onSubmit() {
    this.store.dispatch(new AuthActions.SignUpStepInterviewAction(this.model));
  }
}
