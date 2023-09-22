import { AfterViewInit, Component } from '@angular/core';
import { filesize } from 'filesize';
import md5 from 'md5';
import { StyleObjectLike } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import pako from 'pako';
import { QRCodeSegment } from 'qrcode';
import { Observable, Subscription, interval, timer } from 'rxjs';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styles: [
    `
      .ant-form-item {
        margin-bottom: 0 !important;
      }
    `
  ]
})
export class TransferComponent implements AfterViewInit {
  qrcodeSize = 2000;
  value: QRCodeSegment[] = [];
  data: QRCodeSegment[][] = [];
  loopIndex!: number;
  total!: number;
  intervalId!: NodeJS.Timeout;
  loopStart!: number;
  loopEnd!: number;
  resetLoop = false;
  loopTime = 100;
  timerSub!: Observable<number>;
  suber!: Subscription;
  filename!: string;
  filesize!: string;
  filehash!: string;
  modalBodyStyle!: StyleObjectLike;

  constructor() {
    this.modalBodyStyle = {
      padding: '0 24px'
    };
  }
  ngAfterViewInit(): void {
    this.changeLoopSpeed();
  }
  changeLoopSpeed(): void {
    this.timerSub = interval(this.loopTime);
  }

  change(e: NzUploadChangeParam): void {
    if (this.suber) {
      this.suber.unsubscribe();
    }
    this.isVisible = true;
    const file = e.file.originFileObj;
    if (!file) {
      return;
    }
    this.suber = this.timerSub.subscribe(() => {
      // 循环范围限制
      if (this.loopIndex < this.loopStart) {
        this.loopIndex = this.loopStart;
      }
      if (this.loopIndex > this.loopEnd) {
        this.loopIndex = 1;
      }
      if (this.resetLoop === true) {
        this.resetLoop = false;
        this.loopIndex = this.loopStart;
      }

      this.value = this.data[this.loopIndex - 1];
      this.loopIndex += 1;
    });
    file
      .arrayBuffer()
      .then(r => new Uint8Array(r))
      .then(bytes => {
        this.filehash = md5(bytes);
        return bytes;
      })
      .then(pako.deflate)
      .then(bytes => this.concatUint8Array(this.stringToBytes(`${encodeURIComponent(file.name)}|${file.type}|`), bytes))
      .then(data => {
        this.filename = file.name;
        this.filesize = filesize(file.size, { base: 2, standard: 'jedec' });
        this.data = [];
        this.total = (data.length - (data.length % this.qrcodeSize)) / this.qrcodeSize + 1;
        this.loopIndex = 1;
        this.loopStart = 1;
        this.loopEnd = this.total;
        for (let i = 1; i <= this.total; i++) {
          let start = (i - 1) * this.qrcodeSize;
          let end = i == this.total ? data.length : i * this.qrcodeSize;
          let content = data.slice(start, end);
          this.data.push([
            { mode: 'kanji', data: `${i}/${this.total}|` },
            { mode: 'byte', data: content }
          ]);
        }
      });
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

  isVisible = false;
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  setResetLoop(): void {
    this.resetLoop = true;
  }
}
