import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Menu21Component} from './menu21/menu21.component';
import {Menu22Component} from './menu22/menu22.component';

const routes: Routes = [
  {path: '', redirectTo: 'menu21', pathMatch: 'full'},
  {path: 'menu21', component: Menu21Component},
  {path: 'menu22', component: Menu22Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Module2RoutingModule { }
