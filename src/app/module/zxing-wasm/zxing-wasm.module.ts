import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ZxingGeneratorWasmComponent } from './zxing-generator-wasm/zxing-generator-wasm.component';
import { ZxingScannerWasmComponent } from './zxing-scanner-wasm/zxing-scanner-wasm.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ZxingScannerWasmComponent, ZxingGeneratorWasmComponent],
  exports: [ZxingScannerWasmComponent, ZxingGeneratorWasmComponent]
})
export class ZxingWasmModule {}
