import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ZxingScannerWasmComponent } from './zxing-scanner-wasm.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ZxingScannerWasmComponent],
  exports: [ZxingScannerWasmComponent]
})
export class ZxingWasmModule {}
