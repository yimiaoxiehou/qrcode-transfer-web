import { Component, NgZone } from '@angular/core';
import { QRCodeSegment } from 'qrcode';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styles: []
})
export class TransferComponent {
  qrcodeSize = 1000;
  value?: QRCodeSegment[];
  data: QRCodeSegment[][] = [];
  loopIndex = 0;
  total = 0;
  constructor(private _ngZone: NgZone) {}
  change(e: Event): void {
    const file = (e.target as HTMLInputElement).files![0];
    this.loopIndex = 0;
    let bytes = new Uint8Array();
    file
      .stream()
      .getReader()
      .read()
      .then(a => {
        let bytes = a.value;
        // @ts-ignore
        return this.concatUint8Array(this.stringToBytes(`${encodeURIComponent(file.name)}|${file.type}|`), bytes);
      })
      .then(data => {
        this.data = [];
        this.total = (data.length - (data.length % this.qrcodeSize)) / this.qrcodeSize + 1;
        let i = 1;
        for (; i <= this.total; i++) {
          let start = (i - 1) * this.qrcodeSize;
          let end = i == this.total ? data.length : i * this.qrcodeSize;
          let content = data.slice(start, end);

          this.data.push([
            { mode: 'kanji', data: `${i}/${this.total}|` },
            { mode: 'byte', data: content }
          ]);
        }
      })
      .finally(() => this.loopData());
  }

  loopData() {
    console.log(this.loopIndex);
    this.value = this.data[this.loopIndex];
    this.loopIndex += 1;
    if (this.loopIndex == this.data.length) {
      window.setTimeout(() => this.loopIndex = 0, 1000);
    }
    window.setTimeout(() => this.loopData(), 1000);
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
}
