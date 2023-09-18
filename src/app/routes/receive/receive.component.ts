import { Component } from '@angular/core';
import { Result, BarcodeFormat } from '@zxing/library';
import { Html5QrcodeError, Html5QrcodeResult } from 'html5-qrcode/core';
import * as md5 from 'md5';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styles: []
})
export class ReceiveComponent {
  content: string;
  fileContent: Uint8Array[];
  name: string;
  type: string;
  total: number;
  scanned = 0;
  canvasWidth = 400;
  formats: BarcodeFormat[] = [BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX, BarcodeFormat.EAN_13, BarcodeFormat.QR_CODE];
  ctx: any;
  constructor() {
    this.content = '';
    this.fileContent = [];
    this.name = '';
    this.type = '';
    this.total = 0;
  }

  onFail(error: Html5QrcodeError) {
    console.log(error);
  }

  // onSuccess(result: Html5QrcodeResult) {
  //   const data = result.decodedText.split('|');
  //   let t = data[0].split('/');
  //   const page = Number.parseInt(t[0], 10);
  //   const total = Number.parseInt(t[1], 10);
  //   if (page === 1) {
  //     this.name = data[1];
  //     this.type = data[2];
  //   }

  //   console.log(page);
  //   if (!this.fileContent[page - 1]) {
  //     this.fileContent[page - 1] = data[1];
  //     this.scanned++;
  //     console.log(this.scanned);
  //     console.log(this.fileContent);
  //   }

  //   if (this.scanned === total) {
  //     const blob = new Blob(this.fileContent, { type: this.type });
  //     blob.text().then(d => console.log(md5(d)));
  //     const link = document.createElement('a');
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = this.name;
  //     link.click();
  //     window.URL.revokeObjectURL(link.href);
  //   }
  // }

  onComplete(result: Result) {
    if (!result) {
      return;
    }
    const data = result.getText().split('|');
    this.content = result.getText();
    let t = data[0].split('/');
    const page = Number.parseInt(t[0], 10);
    const total = Number.parseInt(t[1], 10);
    let headerLength;
    if (this.total !== total) {
      this.fileContent = [];
      this.scanned = 0;
      this.name = '';
      this.type = '';
      this.total = total;
      this.initProgressDraw(total);
    }
    if (page === 1) {
      this.name = decodeURIComponent(data[1]);
      this.type = data[2];
      headerLength = `${data[0]}|${data[1]}|${data[2]}|`.length;
    } else {
      headerLength = `${data[0]}|`.length;
    }

    if (!this.fileContent[page - 1]) {
      const rawData = new Uint8Array(result.getRawBytes().subarray(headerLength + 5));
      let r = rawData.reverse();
      while (r[0] === 17 && r[1] === 236) {
        r = r.subarray(2);
      }
      while (r[0] === 0) {
        r = r.subarray(1);
      }
      this.fileContent[page - 1] = r.reverse();
      this.scanned++;
      this.drawCycle(page - 1, 'green');
    }

    if (this.scanned === total) {
      let content = new Uint8Array();
      this.fileContent.forEach(c => (content = this.concatUint8Array(content, c)));
      const blob = new Blob([content], { type: this.type });
      blob.text().then(md5).then(console.log);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = this.name;
      link.click();
      window.URL.revokeObjectURL(link.href);
      this.fileContent = [];
    }
  }

  onError(e: any) {
    console.log(e);
  }

  getContent(): string {
    return this.content;
  }

  stringToBytes(s: string): Uint8Array {
    let bytes = [];
    for (let i = 0; i < s.length; i++) {
      bytes.push(s.charCodeAt(i) & 0xff);
    }
    return new Uint8Array(bytes);
  }

  concatUint8Array(a: Uint8Array, b: Uint8Array): Uint8Array {
    let newLength = a.length + b.length;
    let c = new Uint8Array(newLength);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
  }

  availableDevices: MediaDeviceInfo[] = [];
  deviceCurrent: MediaDeviceInfo | undefined;
  deviceSelected: string = '';

  formatsEnabled: BarcodeFormat[] = [BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX, BarcodeFormat.EAN_13, BarcodeFormat.QR_CODE];

  hasDevices: boolean = true;
  hasPermission: boolean = true;

  qrResultString: string = '';

  torchEnabled = false;
  tryHarder = false;

  clearResult(): void {
    this.qrResultString = '';
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    console.log(resultString);
    this.content = resultString;
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  // 格子大小
  gridSize = 40;
  r = 16;
  initProgressDraw(total: number) {
    var canvas = document.getElementById('stage');
    // @ts-ignore
    if (canvas.getContext) {
      // @ts-ignore
      this.ctx = canvas.getContext('2d');
      for (let i = 0; i < total; i++) {
        this.drawCycle(i, '#000');
      }
    }
  }

  drawCycle(i: number, color: string) {
    let x = (i * this.gridSize + this.gridSize / 2) % this.canvasWidth;
    let y = Math.floor((i * this.gridSize + this.gridSize / 2) / this.canvasWidth) * this.gridSize + this.gridSize / 2;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.r, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    // 填充文字颜色
    this.ctx.font = '16px orbitron';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(i+1, x, y + 4);
    this.ctx.stroke();
  }
}
