import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CabinetComponent} from './cabinet.component';
import {ViewTableComponent} from './components/view-table/view-table.component';
import {ViewBoardComponent} from './components/view-board/view-board.component';
import {TaskPopupComponent} from './components/task-popup/task-popup.component';
import {SettingsPopupComponent} from './components/settings-popup/settings-popup.component';

const routes: Routes = [
  {
    path: 'load',
    component: CabinetComponent,
    children: [
      {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ViewTableComponent,
      },
      {
        path: 'view/:id',
        component: TaskPopupComponent,
        outlet: 'task'
      },
      {
        path: 'settings/:tab',
        component: SettingsPopupComponent,
        outlet: 'popup'
      },
      {
        path: 'board',
        component: ViewBoardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule {
}
