import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: 'user', loadChildren: './user/user.module#UserModule'},
  {path: 'clazz', loadChildren: './clazz/clazz.module#ClazzModule'},
  {path: 'resource', loadChildren: './resource/resource.module#ResourceModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
