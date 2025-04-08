import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'ux-task-plus',
  templateUrl: './task-plus.component.html',
  styleUrls: ['./task-plus.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPlusComponent {
}
