import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NgZorroAntdModule } from './component/ng-zorro-antd.module';

@NgModule({
  imports: [AppModule, NgZorroAntdModule, ServerModule],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
