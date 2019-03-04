import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgZorroAntdModule, NZ_I18N, en_US} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {httpInterceptorProviders} from './http-interceptor';
import {SharedModule} from './shared/shared.module';
import {CanLoginProvide} from './definder/CanLoginProvide';
import { AddResourceComponent } from './resource/add-resource/add-resource.component';
import { DetailResourceComponent } from './resource/detail-resource/detail-resource.component';
import { PdfViewerSelfComponent } from './resource/pdf-viewer-self/pdf-viewer-self.component';
import { ClazzDetailComponent } from './clazz/clazz-detail/clazz-detail.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

  ],
  providers: [{provide: NZ_I18N, useValue: en_US}, CanLoginProvide],
  bootstrap: [AppComponent]
})
export class AppModule {
}
