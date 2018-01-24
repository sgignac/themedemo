import { ApplicationContextService } from './services/application-context.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

//Factory to load the application context at bootstrap
export function applicationContextFactory(appContextService: ApplicationContextService): Function {
    return () => appContextService.initContext();
}


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
      ApplicationContextService,
      {
          provide: APP_INITIALIZER,
          useFactory: applicationContextFactory,
          deps: [ApplicationContextService],
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
