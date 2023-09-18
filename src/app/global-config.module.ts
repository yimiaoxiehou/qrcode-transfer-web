/* eslint-disable import/order */
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { DelonACLModule } from '@delon/acl';
import { AlainThemeModule } from '@delon/theme';

import { environment } from '@env/environment';

const alainModules: any[] = [AlainThemeModule.forRoot(), DelonACLModule.forRoot()];

@NgModule({
  imports: [...alainModules, ...(environment.modules || [])]
})
export class GlobalConfigModule {
  constructor(@Optional() @SkipSelf() parentModule: GlobalConfigModule) {}

  static forRoot(): ModuleWithProviders<GlobalConfigModule> {
    return {
      ngModule: GlobalConfigModule,
      providers: []
    };
  }
}
