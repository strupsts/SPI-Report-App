import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./components/header/header.component";
import {IonicModule} from "@ionic/angular";
import {StorageService} from "./services/storage.service";
import {StatusBarService} from "./services/status-bar.service";


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    IonicModule,
    BrowserModule,
    CommonModule,
  ],
  exports: [HeaderComponent],
  providers: [StorageService, StatusBarService],
})
export class SharedModule {}
