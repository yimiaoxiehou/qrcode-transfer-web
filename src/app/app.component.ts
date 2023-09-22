import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nz-layout class="layout">
      <nz-header>
        <ul nz-menu nzTheme="dark" nzMode="horizontal">
          <li nz-menu-item [routerLink]="'transfer'" nzMatchRouter="true">发送</li>
          <li nz-menu-item [routerLink]="'receive'" nzMatchRouter="true">接收</li>
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
        padding: 0 2vw;
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
          padding: 12px;
        }
      }
    `
  ]
})
export class AppComponent {}
