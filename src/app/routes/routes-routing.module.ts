import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@env/environment';

// layout
// single pages
// passport pages
import { ReceiveComponent } from './receive/receive.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  { path: '', redirectTo: 'receive', pathMatch: 'full' },
  { path: 'transfer', component: TransferComponent, data: { title: '仪表盘', titleI18n: 'dashboard' } },
  { path: 'receive', component: ReceiveComponent, data: { title: '仪表盘', titleI18n: 'dashboard' } },
  { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
  // 单页不包裹Layout
  { path: '**', redirectTo: 'exception/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` module and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
      bindToComponentInputs: true
    })
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule {}
