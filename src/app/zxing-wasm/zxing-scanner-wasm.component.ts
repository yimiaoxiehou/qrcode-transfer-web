import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { ZXingReadOutput } from '@sec-ant/zxing-wasm';
import { BrowserCodeReader, BrowserQRCodeReader } from '@zxing/browser';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-zxing-scanner-wasm',
  template: '<video #video></video>',
  styles: ''
})
export class ZxingScannerWasmComponent implements AfterViewInit {
  @ViewChild('video')
  video!: ElementRef<HTMLVideoElement>;
  @Input('videoWidth')
  videoWidth: string = '200px';
  @Input('useFrontCamera')
  useFrontCamera!: boolean;
  browserCodeReader: BrowserCodeReader = new BrowserQRCodeReader();
  @Output()
  result = new EventEmitter<ZXingReadOutput[]>();
  cameraId!: string;
  zxing: any = null;
  messageService: NzMessageService;

  constructor(
    @Inject(DOCUMENT) private _doc: Document,
    messageService: NzMessageService
  ) {
    this.messageService = messageService;
  }

  ngAfterViewInit(): void {
    if (this._doc.defaultView?.navigator === undefined) {
      return;
    }
    const nav = this._doc.defaultView?.navigator;
    if (nav.mediaDevices === undefined) {
      return;
    }
    this.video.nativeElement.setAttribute('width', this.videoWidth);
    const mediaDevices = nav.mediaDevices;
    // 这里对生成视频进行配置
    var userMediaConstraints = {
      audio: false, // 是否获取音频
      video: {
        facingMode: 'environment'
      }
    };
    console.log(mediaDevices);
    mediaDevices.getUserMedia(userMediaConstraints).then(stream => {
      // setZXingModuleOverrides({
      //   locateFile: (path: string, prefix: any) => {
      //     if (path.endsWith('.wasm')) {
      //       return `./assets/${path}`;
      //     }
      //     return prefix + path;
      //   }
      // });
      this.decodeFromCamera(stream);
    });
  }

  decodeFromCamera(stream: MediaStream): void {
    this.browserCodeReader.decodeFromStream(stream, this.video.nativeElement, (result: any, error: any) => {
      console.error(error);
      console.log(result);
      if (!error) {
        result.bytes = result.rawBytes;
        this.result.emit(Array.of(result));
      }
    });
  }
}
