import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@env/environment';

// layout
// single pages
// passport pages
import { ReceiveComponent } from './receive/receive.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  { path: '', redirectTo: 'transfer', pathMatch: 'full' },
  { path: 'transfer', component: TransferComponent },
  { path: 'receive', component: ReceiveComponent }
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
