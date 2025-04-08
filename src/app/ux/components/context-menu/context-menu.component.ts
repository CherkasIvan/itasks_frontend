import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ux-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.less']
})
export class ContextMenuComponent implements OnInit {
  view = 1;

  constructor() {
  }

  ngOnInit() {
  }

  showMenu(event: any, menu: number): void {
    event.stopPropagation();
    this.view = menu;
  }
}
