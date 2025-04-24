import { Component, Input, OnInit } from "@angular/core";
import { UserModel } from "@core/models/user.model";
import { AvatarComponent } from "../avatar/avatar.component";

@Component({
  selector: "ux-user",
  templateUrl: "./user.component.html",
  imports: [AvatarComponent],
  standalone: true,
  styleUrls: ["./user.component.less"],
})
export class UserComponent implements OnInit {
  @Input() user: UserModel;

  constructor() {}

  ngOnInit() {}
}
