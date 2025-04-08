import {Component, Input, OnInit, Self} from '@angular/core';
import {NgClass} from '@angular/common';
import {TagModel} from '@core/models/tag.model';

@Component({
  selector: 'ux-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.less'],
  providers: [NgClass],
})
export class TagComponent implements OnInit {
  @Input() model: TagModel;

  constructor(@Self() private ngClass: NgClass) {
  }

  ngOnInit() {
    this.onChangeCssClass(this.model.cssClass);
  }

  onChangeCssClass(cssClass) {
    this.ngClass.ngClass = cssClass;
    this.ngClass.ngDoCheck();
  }
}
