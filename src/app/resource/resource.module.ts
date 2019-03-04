import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ResourceRoutingModule} from './resource-routing.module';
import {ResourceComponent} from './resource.component';
import {ResourceService} from './resource.service';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import {SharedModule} from '../shared/shared.module';
import {AddResourceComponent} from './add-resource/add-resource.component';
import {DetailResourceComponent} from './detail-resource/detail-resource.component';
import {PdfViewerSelfComponent} from './pdf-viewer-self/pdf-viewer-self.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    ResourceComponent,
    AddResourceComponent,
    DetailResourceComponent,
    PdfViewerSelfComponent
  ],
  imports: [
    CommonModule,
    ResourceRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    SharedModule,
    PdfViewerModule
  ],
  providers: [ResourceService],
})
export class ResourceModule {
}
