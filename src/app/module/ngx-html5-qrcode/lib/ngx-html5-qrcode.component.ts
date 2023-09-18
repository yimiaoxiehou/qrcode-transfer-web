import { Component, ElementRef, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { Html5QrcodeResult, Html5QrcodeScanner } from 'html5-qrcode';
import { Html5QrcodeError } from 'html5-qrcode/src/core';
import { Html5QrcodeScannerConfig } from 'html5-qrcode/src/html5-qrcode-scanner';

@Component({
  selector: 'ngx-html5-qrcode',
  template: ` <div #reader id="reader"></div> `,
  styles: []
})
export class NgxHtml5QrcodeComponent {
  @ViewChild('reader') reader: ElementRef | undefined;
  html5QrcodeScanner!: Html5QrcodeScanner;
  cameraId: string = '';
  @Input() useFrontCamera: boolean = false;
  @Input() config: Html5QrcodeScannerConfig = {
    fps: 5,
    // 识别框大小
    qrbox: {
      width: 350,
      height: 350
    },
    // 指定使用 QR_CODE 加快识别数度
    formatsToSupport: [0]
  };
  @Output() result: EventEmitter<Html5QrcodeResult> = new EventEmitter<Html5QrcodeResult>();
  @Output() error: EventEmitter<Html5QrcodeError> = new EventEmitter<Html5QrcodeError>();

  constructor() {
    navigator.mediaDevices
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
      .finally(() => this.startHtmlQrCode(this.reader));
  }

  startHtmlQrCode(reader: ElementRef | undefined) {
    this.html5QrcodeScanner = new Html5QrcodeScanner(reader?.nativeElement?.id, this.config, true);
    this.html5QrcodeScanner.render(
      (decodedText: string, result: Html5QrcodeResult) => {
        if (result) {
          this.result.emit(result);
        }
      },
      (errorMessage: string, error: Html5QrcodeError) => {
        if (error) {
          this.error.emit(error);
        }
      }
    );
  }
}
