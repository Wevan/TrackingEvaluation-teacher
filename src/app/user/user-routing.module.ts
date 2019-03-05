import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {UserInfoComponent} from './user-info/user-info.component';

const routes: Routes = [
  {path: '', component: UserComponent},
  {path: 'info', component: UserInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
