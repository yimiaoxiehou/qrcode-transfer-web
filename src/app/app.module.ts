import { NgModule, Type } from '@angular/core';
/* eslint-disable import/order */
/* eslint-disable import/no-duplicates */
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

import { NgZorroAntdModule } from './component/ng-zorro-antd.module';
import { ReceiveComponent } from './component/receive/receive.component';
import { TransferComponent } from './component/transfer/transfer.component';
import { QRCodeModule } from './module/qrcode/qrcode.module';
import { ZxingWasmModule } from './module/zxing-wasm/zxing-wasm.module';

import { AppComponent } from './app.component';
import { SharedModule } from '@shared';

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '@env/environment';

const routes: Routes = [
  { path: '', redirectTo: 'transfer', pathMatch: 'full' },
  { path: 'transfer', component: TransferComponent },
  { path: 'receive', component: ReceiveComponent }
];

const COMPONENTS: Array<Type<void>> = [TransferComponent, ReceiveComponent];

@NgModule({
  imports: [
    SharedModule,
    NgZorroAntdModule,
    QRCodeModule,
    ZxingWasmModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    NzMessageModule,
    NzNotificationModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules
    })
  ],
  declarations: [...COMPONENTS, AppComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: environment.api.baseUrl }],
  bootstrap: [AppComponent]
})
export class AppModule {}
