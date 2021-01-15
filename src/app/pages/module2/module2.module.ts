import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Module2RoutingModule } from './module2-routing.module';
import { Menu21Component } from './menu21/menu21.component';
import { Menu22Component } from './menu22/menu22.component';


@NgModule({
  declarations: [Menu21Component, Menu22Component],
  imports: [
    CommonModule,
    Module2RoutingModule,
  ]
})
export class Module2Module { }
