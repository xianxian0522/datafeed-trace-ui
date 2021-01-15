import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {JaegerComponent} from './pages/jaeger/jaeger.component';
import {NzTreeModule} from 'ng-zorro-antd/tree';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {NzIconModule} from 'ng-zorro-antd/icon';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    JaegerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzTreeModule,
    NzDropDownModule,
    NzCollapseModule,
    NzIconModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
