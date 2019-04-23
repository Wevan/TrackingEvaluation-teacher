import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent, children: [
      // {path: '', component: IndexComponent},
      {path: 'user', loadChildren: '../user/user.module#UserModule'},
      {path: 'clazz', loadChildren: '../clazz/clazz.module#ClazzModule'},
      {path: 'resource', loadChildren: '../resource/resource.module#ResourceModule'},
      {path: 'list', loadChildren: '../list/list.module#ListModule'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {
}
