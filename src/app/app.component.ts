import { Component, ElementRef, OnInit, Renderer2, inject } from '@angular/core';
import { RouterOutlet, RouterLink, NavigationEnd, NavigationError, RouteConfigLoadStart, Router } from '@angular/router';
import { TitleService, VERSION as VERSION_ALAIN, stepPreloader } from '@delon/theme';
import { environment } from '@env/environment';
import { SharedModule } from '@shared';
import { NzLayoutComponent, NzHeaderComponent, NzContentComponent } from 'ng-zorro-antd/layout';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VERSION as VERSION_ZORRO } from 'ng-zorro-antd/version';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, NzLayoutComponent, NzHeaderComponent, NzContentComponent, RouterLink, RouterOutlet],
  template: `
    <nz-layout class="layout">
      <nz-header>
        <ul nz-menu nzTheme="dark" nzMode="horizontal">
          <li nz-menu-item [routerLink]="'transfer'" nzMatchRouter="true">发送</li>
          <li nz-menu-item [routerLink]="'receive'" nzMatchRouter="true">接收</li>
          <li nz-menu-item [routerLink]="'video-decode'" nzMatchRouter="true">录屏解析</li>
        </ul>
      </nz-header>
      <nz-content>
        <div class="inner-content">
          <router-outlet />
        </div>
      </nz-content>
    </nz-layout>
  `,
  styles: [
    `
      .layout {
        min-height: 100vh;
      }

      nz-header {
        position: fixed;
        width: 100%;
        height: 5vh !important;
      }

      [nz-menu] {
        line-height: 5vh;
      }

      nz-content {
        padding: 0 1vw;
        margin-top: 5vh;
      }

      nz-breadcrumb {
        margin: 16px 0;
      }

      .inner-content {
        min-height: 90vh;
        padding: 24px;
        background: #fff;
      }

      @media (max-width: 768px) {
        nz-content {
          padding: 0 !important;
          margin-top: 5vh;
        }
        .inner-content {
          min-height: 95vh !important;
          padding: 0;
        }
      }
    `
  ]
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly titleSrv = inject(TitleService);
  private readonly modalSrv = inject(NzModalService);

  private donePreloader = stepPreloader();

  constructor(el: ElementRef, renderer: Renderer2) {
    renderer.setAttribute(el.nativeElement, 'ng-alain-version', VERSION_ALAIN.full);
    renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full);
  }

  ngOnInit(): void {
    let configLoad = false;
    this.router.events.subscribe(ev => {
      if (ev instanceof RouteConfigLoadStart) {
        configLoad = true;
      }
      if (configLoad && ev instanceof NavigationError) {
        this.modalSrv.confirm({
          nzTitle: `提醒`,
          nzContent: environment.production ? `应用可能已发布新版本，请点击刷新才能生效。` : `无法加载路由：${ev.url}`,
          nzCancelDisabled: false,
          nzOkText: '刷新',
          nzCancelText: '忽略',
          nzOnOk: () => location.reload()
        });
      }
      if (ev instanceof NavigationEnd) {
        this.donePreloader();
        this.titleSrv.setTitle();
        this.modalSrv.closeAll();
      }
    });
  }
}
