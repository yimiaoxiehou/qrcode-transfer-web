import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { default as ngLang } from '@angular/common/locales/zh';
import { ApplicationConfig, EnvironmentProviders, Provider } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
  withInMemoryScrolling,
  withHashLocation,
  RouterFeatures,
  Routes
} from '@angular/router';
import { IconDefinition } from '@ant-design/icons-angular';
import { CarOutline, RocketOutline } from '@ant-design/icons-angular/icons';
import { AlainProvideLang, provideAlain, zh_CN as delonLang } from '@delon/theme';
import { AlainConfig } from '@delon/util/config';
import { environment } from '@env/environment';
import { zhCN as dateLang } from 'date-fns/locale';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { zh_CN as zorroLang } from 'ng-zorro-antd/i18n';
import { provideNzIcons, NzIconModule } from 'ng-zorro-antd/icon';

import { ReceiveComponent } from './receive/receive.component';
import { TransferComponent } from './transfer/transfer.component';
import { CameraDecodeComponent } from './camera-decode/camera-decode.component';
import { ICONS } from '../style-icons';
import { ICONS_AUTO } from '../style-icons-auto';

// 引入你需要的图标，比如你需要 fill 主题的 AccountBook Alert 和 outline 主题的 Alert，推荐 ✔️

const defaultLang: AlainProvideLang = {
  abbr: 'zh-CN',
  ng: ngLang,
  zorro: zorroLang,
  date: dateLang,
  delon: delonLang
};

const alainConfig: AlainConfig = {};

const ngZorroConfig: NzConfig = {};

const routerFeatures: RouterFeatures[] = [
  withComponentInputBinding(),
  withViewTransitions(),
  withInMemoryScrolling({ scrollPositionRestoration: 'top' })
];
if (environment.useHash) routerFeatures.push(withHashLocation());

const routes: Routes = [
  { path: '', redirectTo: 'transfer', pathMatch: 'full' },
  { path: 'transfer', component: TransferComponent },
  { path: 'receive', component: ReceiveComponent },
  { path: 'video-decode', component: CameraDecodeComponent }
];

const icons: IconDefinition[] = [CarOutline, RocketOutline];

const providers: Array<Provider | EnvironmentProviders> = [
  provideHttpClient(withInterceptors([...(environment.interceptorFns ?? [])])),
  provideAnimations(),
  provideRouter(routes, ...routerFeatures),
  provideAlain({ config: alainConfig, defaultLang, icons: [...ICONS_AUTO, ...ICONS] }),
  provideNzConfig(ngZorroConfig),
  provideNzIcons(icons),
  ...(environment.providers || [])
];

export const appConfig: ApplicationConfig = {
  providers: providers
};
