import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {IconsProviderModule} from '../../icons-provider.module';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NzLayoutModule,
    IconsProviderModule,
    NzMenuModule,
    FormsModule,
    RouterModule,
    NzAvatarModule,
    NzDropDownModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
