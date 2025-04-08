import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit, AfterViewInit {
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

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Изменение расположения и длины бегунка
   * @param event
   */
  onMoveSolid(event) {
    const currentElement: HTMLElement = event.target;
    if (currentElement.tagName !== 'A') {
      return;
    }
    this.headerActiveLineWidth = currentElement.clientWidth + 10;
    this.headerActiveLineLeft = currentElement.offsetLeft - 6;

  }

  ngAfterViewInit() {
    setTimeout(_ => {
      const element: HTMLElement = document.getElementsByClassName('menu__item_active')[0] as HTMLElement;
      if (element) {
        this.headerActiveLineWidth = element.clientWidth + 10;
        this.headerActiveLineLeft = element.offsetLeft - 6;
      }
    }, 100);
  }
}
