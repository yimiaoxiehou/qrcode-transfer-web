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
import { RouteRoutingModule } from './component/routes-routing.module';
import { TransferComponent } from './component/transfer/transfer.component';
import { QRCodeModule } from './module/qrcode/qrcode.module';
import { ZxingWasmModule } from './module/zxing-wasm/zxing-wasm.module';

// #region global third module
const GLOBAL_THIRD_MODULES: Array<Type<void>> = [];
// #endregion

import { AppComponent } from './app.component';
import { SharedModule } from '@shared';

const COMPONENTS: Array<Type<void>> = [TransferComponent, ReceiveComponent];

@NgModule({
  declarations: [...COMPONENTS, AppComponent],

  imports: [
    SharedModule,
    NgZorroAntdModule,
    RouteRoutingModule,
    QRCodeModule,
    ZxingWasmModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    NzMessageModule,
    NzNotificationModule,
    ...GLOBAL_THIRD_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
