import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { ZXingReadOptions, ZXingReadOutput, readBarcodeFromImageData, setZXingModuleOverrides } from '@sec-ant/zxing-wasm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-zxing-scanner-wasm',
  templateUrl: './zxing-scanner-wasm.component.html',
  styleUrls: ['./zxing-scanner-wasm.component.css']
})
export class ZxingScannerWasmComponent implements AfterViewInit {
  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;
  @Input('useFrontCamera')
  useFrontCamera!: boolean;
  @Output()
  result = new EventEmitter<ZXingReadOutput[]>();
  cameraId!: string;
  zxing: any = null;
  zxingReadOptions: ZXingReadOptions = {
    formats: ['QRCode'],
    maxSymbols: 1
  };
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
    const mediaDevices = nav.mediaDevices;
    mediaDevices
      .enumerateDevices()
      .then(devices => {
        const cameras = devices.filter(device => device.kind === 'videoinput');
        if (cameras.length === 1) {
          this.cameraId = cameras[0].deviceId;
          return;
        }
        if (this.useFrontCamera) {
          this.cameraId = cameras.filter(c => c.label.indexOf('facing front') >= 0)[0].deviceId;
        } else {
          this.cameraId = cameras.filter(c => c.label.indexOf('facing back') >= 0)[0].deviceId;
        }
      })
      .finally(() => {
        nav.mediaDevices
          .getUserMedia({
            video: {
              deviceId: this.cameraId
            }
          })
          .then(stream => {
            setZXingModuleOverrides({
              locateFile: (path: string, prefix: any) => {
                if (path.endsWith('.wasm')) {
                  return `./assets/${path}`;
                }
                return prefix + path;
              }
            });

            this.decodeFromCamera(stream);
          })
          .catch(function (err0r) {
            console.log('Something went wrong!');
          });
      });
  }

  decodeFromCamera(stream: MediaStream): void {
    const track = stream.getVideoTracks()[0];
    const media_processor = new MediaStreamTrackProcessor({
      track
    });
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
      return;
    }
    this.decodeFromReader(media_processor.readable.getReader(), canvas, ctx)
      .pipe(
        // 去重
        distinctUntilChanged((p, c) => {
          if (p.length !== c.length) {
            return false;
          }
          for (let i = 0; i < p.length; i++) {
            if (p[i].text !== c[i].text) {
              return false;
            }
          }
          return true;
        })
      )
      .subscribe(r => this.result.emit(r));
  }

  decodeFromReader(
    reader: ReadableStreamDefaultReader<VideoFrame>,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ): Observable<ZXingReadOutput[]> {
    return new Observable(subscriber => {
      const pump = () => {
        reader
          .read()
          .then(({ done, value }) => {
            if (done) {
              return;
            } else {
              canvas.height = value.codedHeight;
              canvas.width = value.codedWidth;
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.save();
              ctx.drawImage(value, 0, 0, canvas.width, canvas.height);
              ctx.restore();
              value.close();
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              return readBarcodeFromImageData(imageData, this.zxingReadOptions);
            }
          })
          .then(output => {
            subscriber.next(output);
            pump();
          });
      };
      pump();
      return () => {
        reader.cancel();
      };
    });
  }
}

declare var MediaStreamTrackProcessor: any;
