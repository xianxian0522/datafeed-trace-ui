import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JaegerComponent} from './pages/jaeger/jaeger.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'jaeger' },
  { path: 'jaeger', component: JaegerComponent },
  // { path: '',
  //   loadChildren: () => import('./share/layout/layout.module').then(m => m.LayoutModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
