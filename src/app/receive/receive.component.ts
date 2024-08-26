import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '@shared';
import { filesize } from 'filesize';
import md5 from 'md5';
import { NzMessageService } from 'ng-zorro-antd/message';
import pako from 'pako';

import { ZxingWasmModule } from '../zxing-wasm/zxing-wasm.module';

@Component({
  selector: 'app-receive',
  standalone: true,
  imports: [SharedModule, ZxingWasmModule],
  templateUrl: './receive.component.html',
  styles: [
    `
      canvas {
        display: inline-block;
        width: 100%;
        height: auto;
      }
    `
  ]
})
export class ReceiveComponent {
  // 摄像头是否准备好
  cameraReady: boolean = false;
  // 文件内容
  fileContent!: Uint8Array[];
  // 文件名
  filename!: string;
  // 文件大小
  filesize!: string;
  // 文件哈希
  filehash!: string;
  // 文件Url
  fileUrl!: string;
  // 文件类型
  type!: string;
  // 总页数
  total!: number;
  // 已扫描页数
  scanned!: number;
  // 扫描结果
  @ViewChild('stage')
  stageCanvas!: ElementRef<HTMLCanvasElement>;
  // 桶
  buckets!: number[];
  // 桶大小
  bucketSize!: number;
  // 消息服务
  messageService: NzMessageService;
  // 弹窗是否显示
  isVisible = false;

  constructor(messageService: NzMessageService) {
    this.messageService = messageService;
  }

  decodeResult(results: Array<import('@sec-ant/zxing-wasm').ZXingReadOutput>) {
    results.forEach(result => {
      if (!result) {
        return;
      }
      console.log(result);
      // 二维码数据格式:
      // 首页：   `${curPage}/${totalPage}|${filename}|${filetype}|${data}`
      // 其他页： `${curPage}/${totalPage}|${data}`
      const data = result.text.split('|');
      let t = data[0].split('/');
      const page = Number.parseInt(t[0], 10);
      const total = Number.parseInt(t[1], 10);

      if (!total || total === 0) {
        return;
      }

      let headerLength;
      // 页数不匹配，应该是扫描到了新二维码，重新初始化
      if (this.total !== total) {
        this.fileContent = [];
        this.scanned = 0;
        this.filename = '';
        this.type = '';
        this.total = total;
        this.buckets = new Array(total).fill(0);
        this.bucketSize = Math.ceil(total / 200);
        this.resetProgress();
      }

      // 首页特殊处理
      if (page === 1) {
        this.filename = decodeURIComponent(data[1]);
        this.type = data[2];
        headerLength = `${data[0]}|${data[1]}|${data[2]}|`.length;
      } else {
        headerLength = `${data[0]}|`.length;
      }

      // 未识别页，保存数据
      if (!this.fileContent[page - 1]) {
        const rawData = new Uint8Array(result.bytes.subarray(headerLength));
        this.fileContent[page - 1] = rawData;
        this.scanned++;
        this.renderProgress(page - 1);
      }

      // 扫描完成，弹窗下载。
      if (this.scanned === total) {
        this.isVisible = true;
        let content = new Uint8Array();
        this.fileContent.forEach(c => (content = this.concatUint8Array(content, c)));
        content = pako.inflate(content);
        this.filehash = md5(content);
        this.filesize = filesize(content.length, { base: 2, standard: 'jedec' });
        const blob = new Blob([content], { type: this.type });
        this.fileUrl = window.URL.createObjectURL(blob);
        this.fileContent = [];
      }
    });
  }

  concatUint8Array(a: Uint8Array, b: Uint8Array): Uint8Array {
    let newLength = a.length + b.length;
    let c = new Uint8Array(newLength);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
  }

  showProgressDetail(e: MouseEvent) {
    const x = Math.floor(e.offsetX / this.gridSize);
    const y = Math.floor(e.offsetY / this.gridSize);
    const index = x + y * 15;
    if (this.buckets && this.buckets[index] < this.bucketSize) {
      let start = index * this.bucketSize + 1;
      let end = index * this.bucketSize + this.bucketSize + 1;
      let i = index;
      while (i > 0) {
        i--;
        if (this.buckets[i] < this.bucketSize) {
          start = i * this.bucketSize + 1;
        } else {
          break;
        }
      }
      i = index;
      const endIndex = this.total > 200 ? 200 : this.total;
      while (i < endIndex) {
        i++;
        if (this.buckets[i] < this.bucketSize) {
          end = i * this.bucketSize + this.bucketSize + 1;
        } else {
          break;
        }
      }
      if (end > this.total) {
        end = this.total;
      }
      this.messageService.warning(`${start} 到 ${end} 页暂未传输。`);
    }
  }

  // 格子大小
  gridSize!: number;
  // 绘制初始化进度图，200格
  resetProgress() {
    const canvas = this.stageCanvas.nativeElement;
    canvas.width = canvas.offsetWidth;
    this.gridSize = canvas.offsetWidth / 15;
    canvas.height = Math.ceil(200 / 15) * this.gridSize;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bs = this.total / this.bucketSize < 200 ? this.total / this.bucketSize : 200;
      let x = 0;
      let y = 0;
      for (let i = 0; i < bs; i++) {
        x = (i % 15) * this.gridSize;
        y = Math.floor(i / 15) * this.gridSize;
        ctx.beginPath();
        const rectangle = new Path2D();
        rectangle.rect(x, y, this.gridSize - 3, this.gridSize - 3);
        ctx.fillStyle = '#FFEB3B';
        ctx.fill(rectangle);
      }
    }
  }

  // 渲染进度
  renderProgress(index: number) {
    const bucketIndex = Math.floor(index / this.bucketSize);
    this.buckets[bucketIndex]++;
    const canvas = this.stageCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    if (this.buckets[bucketIndex] >= this.bucketSize) {
      let x = (bucketIndex * this.gridSize + 1) % canvas.width;
      let y = Math.floor((bucketIndex * this.gridSize + 1) / canvas.width) * this.gridSize;
      ctx.beginPath();
      const rectangle = new Path2D();
      rectangle.rect(x, y, this.gridSize - 3, this.gridSize - 3);
      ctx.fillStyle = '#4CAF50';
      ctx.fill(rectangle);
    }
  }

  handleOk(): void {
    this.isVisible = false;
  }
}
