import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ResumeComponent } from './resume/resume.component';
import { ensureRoutesExist } from './common/route-initializer';
import { RouteLoader } from './common/route-loader.service';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, ResumeComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ensureRoutesExist,
      multi: true,
      deps: [HttpClient, RouteLoader],
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
