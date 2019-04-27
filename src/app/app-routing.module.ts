import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CanLoginProvide} from './definder/CanLoginProvide';

const routes: Routes = [

  {path: '', loadChildren: './index/index.module#IndexModule', canActivate: [CanLoginProvide]},
  {path: 'login', loadChildren: './login/login.module#LoginModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
