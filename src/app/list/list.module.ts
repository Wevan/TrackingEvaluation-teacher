import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ListRoutingModule} from './list-routing.module';
import {ListComponent} from './list.component';
import {CardComponent} from '../card/card.component';
import {ResourceService} from '../resource/resource.service';

@NgModule({
  declarations: [
    ListComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ListRoutingModule
  ],
  providers: [ResourceService],
})
export class ListModule {
}
