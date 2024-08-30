import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { SharedModule } from '@shared';
import { scanImageData, setModuleArgs, getDefaultScanner, ZBarScanner, ZBarSymbol } from '@undecaf/zbar-wasm';
import { from, animationFrames, map, mergeMap, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-video-decode',
  standalone: true,
  imports: [SharedModule],
  template: `<div class="viewport">
    <canvas #canvas id="canvas"></canvas>
    <video #video id="video" muted autoplay playsinline (playing)="changeCanvasSize()"></video>
  </div>`,
  styles: `
.viewport {
    display: inline-block;
    position: relative;
}

img, video, #note, #timing {
    display: none;
    max-width: 100%;
}
`
})
export class CameraDecodeComponent {
  @ViewChild('video', { static: true })
  videoEle!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true })
  canvasElement!: ElementRef<HTMLCanvasElement>;
  requestId!: number | null;
  scanner!: ZBarScanner;
  canvasCtx!: CanvasRenderingContext2D;
  animationFrameSubj!: Subscription;
  result = new EventEmitter<Int8Array>();
  constructor(@Inject(PLATFORM_ID) private _platform: Object) {
    setModuleArgs({
      /**
       * This function must return the URL or path of the WASM file.
       *
       * @param _filename default WASM filename ('zbar.wasm')
       * @param _directory default WASM directory (URL or directory of the current script)
       * @returns {string} URL or path of the WASM file
       */
      locateFile: (_filename: any, _directory: any) => {
        return '/assets/zbar.wasm';
      }
    });
  }

  onStart() {
    if (isPlatformBrowser(this._platform) && 'mediaDevices' in navigator) {
      // 这里对生成视频进行配置
      var userMediaConstraints = {
        video: {
          facingMode: 'environment'
        }
      };
      navigator.mediaDevices
        .getUserMedia(userMediaConstraints)
        .then(stream => {
          this.videoEle.nativeElement.srcObject = stream;
          this.videoEle.nativeElement.play();
          getDefaultScanner().then((scanner: ZBarScanner) => {
            this.scanner = scanner;
            const ctx = this.canvasElement.nativeElement.getContext('2d');
            if (ctx == null) {
              return;
            }
            this.canvasCtx = ctx;
            this.animationFrameSubj = from(animationFrames())
              .pipe(
                // 绘制当前帧到 canvas
                tap(() => this.canvasCtx.drawImage(this.videoEle.nativeElement, 0, 0)),
                // 获取当前帧的图形
                map(() =>
                  this.canvasCtx.getImageData(0, 0, this.canvasElement.nativeElement.width, this.canvasElement.nativeElement.height)
                ),
                // 识别二维码
                mergeMap((imageData: ImageData) => scanImageData(imageData, this.scanner)),
                mergeMap((arr: ZBarSymbol[]) => arr),
                // 抛出识别结果
                tap((symbol: ZBarSymbol) => this.result.emit(symbol.data)),
                // 描绘二维码识别框
                tap((symbol: ZBarSymbol) => {
                  const lastPoint = symbol.points[symbol.points.length - 1];
                  this.canvasCtx.moveTo(lastPoint.x, lastPoint.y);
                  symbol.points.forEach((point: { x: number; y: number }) => this.canvasCtx.lineTo(point.x, point.y));
                  this.canvasCtx.lineWidth = Math.max(
                    Math.min(this.canvasElement.nativeElement.height, this.canvasElement.nativeElement.width) / 100,
                    1
                  );
                  this.canvasCtx.strokeStyle = '#00e00060';
                  this.canvasCtx.stroke();
                })
              )
              .subscribe();
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  onStop() {
    this.videoEle.nativeElement.pause();
    (this.videoEle.nativeElement.srcObject as MediaStream).getVideoTracks()[0].stop();
    this.videoEle.nativeElement.srcObject = null;
    this.animationFrameSubj.unsubscribe();
  }

  changeCanvasSize(): void {
    const source = this.videoEle.nativeElement;
    const width = source.getAttribute('naturalWidth') || `${source.videoWidth}px` || source.getAttribute('width');
    const height = source.getAttribute('naturalHeight') || `${source.videoHeight}px` || source.getAttribute('height');
    this.canvasElement.nativeElement.setAttribute('width', `${width}`);
    this.canvasElement.nativeElement.setAttribute('height', `${height}`);
  }
}
