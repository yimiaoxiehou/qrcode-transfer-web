import { AfterViewInit, Component } from '@angular/core';
import { SharedModule } from '@shared';
import { filesize } from 'filesize';
import md5 from 'md5';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { StyleObjectLike } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import pako from 'pako';
import { QRCodeSegment } from 'qrcode';
import { Observable, Subscription, interval } from 'rxjs';

import { QRCodeComponent } from '../qrcode/qrcode.component';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [SharedModule, NzInputNumberComponent, QRCodeComponent],
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
  // 二维码图片大小
  qrcodeSize = 2000;
  // 二维码数据
  value: QRCodeSegment[] = [];
  // 二维码数据
  data: QRCodeSegment[][] = [];
  // 循环索引
  loopIndex!: number;
  // 总循环次数
  total!: number;
  // 循环定时器
  intervalId!: NodeJS.Timeout;
  // 循环起始索引
  loopStart!: number;
  // 循环结束索引
  loopEnd!: number;
  // 是否重置循环
  resetLoop = false;
  // 循环时间
  loopTime = 100;
  // 定时器订阅
  timerSub!: Observable<number>;
  // 订阅
  suber!: Subscription;
  // 文件名
  filename!: string;
  // 文件大小
  filesize!: string;
  // 文件切片
  filesplit!: string[];
  // 文件hash
  filehash!: string;
  // 模态框样式
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
    // 显示模态框
    this.isVisible = true;
    const file = e.file.originFileObj;
    if (!file) {
      return;
    }
    // 订阅定时器
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

      // 获取当前循环数据
      this.value = this.data[this.loopIndex - 1];
      // 循环索引自增
      this.loopIndex += 1;
    });
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
      .then(bytes => this.concatUint8Array(this.stringToBytes(`${encodeURIComponent(file.name)}|${file.type}|`), bytes))
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
  }

  // 取消操作
  handleCancel(): void {
    this.isVisible = false;
  }

  // 重置循环
  setResetLoop(): void {
    this.resetLoop = true;
  }
}
