import { NgModule } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@NgModule({
  exports: [NzUploadModule, NzModalModule, NzLayoutModule, NzBreadCrumbModule, NzInputNumberModule, NzRadioModule]
})
export class NgZorroAntdModule {}
