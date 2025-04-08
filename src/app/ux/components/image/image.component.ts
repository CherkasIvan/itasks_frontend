import {Component, OnInit} from '@angular/core';
import {ImageService} from '@core/services/image/image.service';

@Component({
  selector: 'ux-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.less']
})
export class ImageComponent implements OnInit {

  constructor(public imageService: ImageService) {
  }

  ngOnInit() {
  }

}
