import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [UserComponent, UserInfoComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule {
}
