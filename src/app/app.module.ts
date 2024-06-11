import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ReportModule} from "./report-feature/report.module";
import {SharedModule} from "./shared/shared.module";
import {IonicStorageModule} from "@ionic/storage-angular";
import {CoreModule} from "./core/core.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'ios',
    }),
    IonicStorageModule.forRoot(),
    AppRoutingModule,


    // App-own Modules
    CoreModule,
    SharedModule,
    ReportModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
