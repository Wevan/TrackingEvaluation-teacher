import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ResourceComponent} from './resource.component';
import {AddResourceComponent} from './add-resource/add-resource.component';
import {PdfViewerSelfComponent} from './pdf-viewer-self/pdf-viewer-self.component';
import {DetailResourceComponent} from './detail-resource/detail-resource.component';

const routes: Routes = [
  {path: '', component: ResourceComponent},
  {path: 'add', component: AddResourceComponent},
  {path: 'viewer/:id', component: PdfViewerSelfComponent},
  {path: 'video/:id', component: DetailResourceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceRoutingModule {
}
