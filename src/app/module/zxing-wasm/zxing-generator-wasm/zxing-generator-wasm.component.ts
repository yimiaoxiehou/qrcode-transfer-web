import { Component, OnInit } from '@angular/core';
import { setZXingModuleOverrides, writeBarcodeToImageFile } from '@sec-ant/zxing-wasm';

@Component({
  selector: 'app-zxing-generator-wasm',
  templateUrl: './zxing-generator-wasm.component.html',
  styleUrls: ['./zxing-generator-wasm.component.css']
})
export class ZxingGeneratorWasmComponent implements OnInit {
  qrcodeImgUrl!: string;

  constructor() {}

  async ngOnInit() {
    setZXingModuleOverrides({
      locateFile: (path: string, prefix: any) => {
        if (path.endsWith('.wasm')) {
          return `./assets/${path}`;
        }
        return prefix + path;
      }
    });

    const writeOutput = await writeBarcodeToImageFile('Hello world!', {
      format: 'QRCode',
      charset: 'UTF-8',
      quietZone: 5,
      width: 150,
      height: 150,
      eccLevel: 2
    });
    const img = writeOutput.image;
    if (img === null) {
      return;
    }
    this.qrcodeImgUrl = URL.createObjectURL(img);
  }

  getQrcodeImgUrl(): string {
    return this.qrcodeImgUrl;
  }
}
