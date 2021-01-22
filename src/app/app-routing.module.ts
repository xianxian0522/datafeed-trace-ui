import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JaegerComponent} from './pages/jaeger/jaeger.component';
import {JaegerEditComponent} from './pages/jaeger/jaeger-edit.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'jaeger' },
  { path: 'jaeger', component: JaegerComponent },
  { path: 'trace/:id', component: JaegerEditComponent},
  // { path: '',
  //   loadChildren: () => import('./share/layout/layout.module').then(m => m.LayoutModule)
  // },
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
