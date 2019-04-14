import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClazzComponent} from './clazz.component';
import {ClazzDetailComponent} from './clazz-detail/clazz-detail.component';

const routes: Routes = [
  {path: '', component: ClazzComponent},
  {path: 'detail/:id', component: ClazzDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClazzRoutingModule {
}
