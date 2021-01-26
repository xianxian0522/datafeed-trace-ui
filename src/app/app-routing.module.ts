import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {JaegerComponent} from './pages/jaeger/jaeger.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {TraceComponent} from './pages/trace/trace.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'datafeed' },
  { path: 'datafeed', component: JaegerComponent },
  { path: 'trace/:id', component: TraceComponent},
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
