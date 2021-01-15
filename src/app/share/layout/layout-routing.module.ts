import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
  {
    path: 'module1',
    data: {section: 'module1'},
    component: LayoutComponent,
    loadChildren: () => import('../../pages/module1/module1.module').then(m => m.Module1Module)
  },
  {
    path: 'module2',
    data: {section: 'module2'},
    component: LayoutComponent,
    loadChildren: () => import('../../pages/module2/module2.module').then(m => m.Module2Module)
  },
  {
    path: '**', component: LayoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
