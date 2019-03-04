import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClazzRoutingModule} from './clazz-routing.module';
import {ClazzComponent} from './clazz.component';
import {SharedModule} from '../shared/shared.module';
import {ClazzDetailComponent} from './clazz-detail/clazz-detail.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    ClazzComponent,
    ClazzDetailComponent
  ],
  imports: [
    CommonModule,
    ClazzRoutingModule,
    SharedModule,
    NgxEchartsModule
  ]
})
export class ClazzModule {
}
