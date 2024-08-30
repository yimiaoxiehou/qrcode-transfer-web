import { Component } from '@angular/core';
import { SharedModule } from '@shared';
import { filesize } from 'filesize';
import md5 from 'md5';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import pako from 'pako';
import { QRCodeSegment } from 'qrcode';
import { Subscription, BehaviorSubject, interval } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import { QRCodeComponent } from '../qrcode/qrcode.component';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [SharedModule, QRCodeComponent],
  templateUrl: './transfer.component.html',
  styles: [
    `
      .ant-form-item {
        margin-bottom: 0 !important;
      }
    `
  ]
})
export class TransferComponent {
  // 文件名
  filename!: string;
  // 文件大小
  filesize!: string;
  // 文件切片
  filesplit!: string[];
  // 文件hash
  filehash!: string;
  // 二维码图片大小
  qrcodeSize = 1900;
  // 二维码数据
  value: QRCodeSegment[] = [];
  // 二维码数据
  data: QRCodeSegment[][] = [];
  // 总循环次数
  total!: number;
  // 循环索引
  loopIndex!: number;
  // 循环起始索引
  loopStart!: number;
  // 跳过
  loopOffset = 0;
  // 循环结束索引
  loopEnd!: number;
  // 循环时间定时器
  playSpeed = 5;
  playStop = false;
  loopTimeSub = new BehaviorSubject(4000 / (this.playSpeed * 2));
  // 订阅
  suber!: Subscription;
  // 通知服务
  notification: NzNotificationService;

  constructor(notification: NzNotificationService) {
    this.notification = notification;
  }

  change(e: NzUploadChangeParam): void {
    // 显示模态框
    this.isVisible = true;
    const file = e.file.originFileObj;
    if (!file) {
      return;
    }
    // 获取文件字节
    file
      .arrayBuffer()
      .then(r => new Uint8Array(r))
      .then(bytes => {
        // 获取文件hash
        this.filehash = md5(bytes);
        return bytes;
      })
      .then(pako.deflate)
      .then(bytes => this.concatUint8Array(this.stringToBytes(`${encodeURIComponent(file.name)}|${file.type}|${this.filehash}|`), bytes))
      .then(data => {
        // 获取文件名
        this.filename = file.name;
        // 获取文件大小
        this.filesize = filesize(file.size, { base: 2, standard: 'jedec' });
        this.data = [];
        // 计算总循环次数
        this.total = (data.length - (data.length % this.qrcodeSize)) / this.qrcodeSize + 1;
        // 循环索引重置
        this.loopIndex = 1;
        // 循环起始索引
        this.loopStart = 1;
        // 循环结束索引
        this.loopEnd = this.total;
        // 循环拼接数据
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
    this.resetLoop();
  }

  resetLoop(): void {
    if (this.suber) {
      this.suber.unsubscribe();
    }
    this.loopOffset = 0;
    this.playStop = false;
    this.suber = this.loopTimeSub
      .pipe(
        switchMap(val => interval(val)),
        map((val: number) => {
          this.loopIndex = ((val + this.loopOffset) % (this.loopEnd - this.loopStart + 1)) + this.loopStart;
          return this.loopIndex;
        }),
        distinctUntilChanged(),
        tap((val: number) => {
          this.value = this.data[val - 1];
        })
      )
      .subscribe();
  }

  // 将字符串转换为字节
  stringToBytes(s: string): Uint8Array {
    let bytes = [];
    for (let i = 0; i < s.length; i++) {
      bytes.push(s.charCodeAt(i) & 0xff);
    }
    return new Uint8Array(bytes);
  }

  // 拼接字节数组
  concatUint8Array(a: Uint8Array, b: Uint8Array): Uint8Array {
    let newLength = a.length + b.length;
    let c = new Uint8Array(newLength);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
  }

  // 是否显示模态框
  isVisible = false;
  // 显示模态框
  showModal(): void {
    this.isVisible = true;
  }

  // 确认操作
  handleOk(): void {
    this.isVisible = false;
    if (this.suber) {
      this.suber.unsubscribe();
    }
    this.loopTimeSub = new BehaviorSubject(4000 / (this.playSpeed * 2));
    this.filename = '';
    this.filesize = '';
    this.filesplit = [];
    this.filehash = '';
    this.value = [];
    this.data = [];
    this.total = 0;
    this.loopIndex = 0;
    this.loopStart = 0;
    this.loopOffset = 0;
    this.loopEnd = 0;
    this.playSpeed = 4;
    this.playStop = false;
    this.loopTimeSub = new BehaviorSubject(4000 / (this.playSpeed * 2));
  }

  // 取消操作
  handleCancel(): void {
    this.handleOk();
  }

  // 重置循环
  setResetLoop(): void {
    this.resetLoop();
  }

  loopTimeChange(val: number): void {
    this.loopTimeSub.next(4000000000 / (val * 2));
    this.loopOffset = this.loopIndex;
  }

  forward(): void {
    this.loopOffset += Math.floor((this.loopEnd - this.loopStart) / 10);
  }

  backward(): void {
    this.loopOffset -= Math.floor((this.loopEnd - this.loopStart) / 10);
  }

  stop(): void {
    this.playStop = !this.playStop;
    if (!this.playStop) {
      this.loopTimeChange(this.playSpeed * 1000000);
    } else {
      this.loopTimeChange(1);
    }
  }
}
