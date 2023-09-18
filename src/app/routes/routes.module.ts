import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

// dashboard pages
// single pages

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { WebcamModule } from 'ngx-webcam';

import { ReceiveComponent } from './receive/receive.component';
import { RouteRoutingModule } from './routes-routing.module';
import { TransferComponent } from './transfer/transfer.component';
import { NgxHtml5QrcodeModule } from '../module/ngx-html5-qrcode/lib/ngx-html5-qrcode.module';
import { QRCodeModule } from '../module/qrcode/qrcode.module';
import { ZxingWasmModule } from '../module/zxing-wasm/zxing-wasm.module';
// eslint-disable-next-line prettier/prettier
const COMPONENTS: Array<Type<void>> = [TransferComponent, ReceiveComponent];

@NgModule({
  imports: [SharedModule, RouteRoutingModule, QRCodeModule, WebcamModule, NgxHtml5QrcodeModule, ZXingScannerModule, ZxingWasmModule],
  declarations: COMPONENTS
})
export class RoutesModule {}
