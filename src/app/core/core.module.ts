import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {StarterService} from "./services/starter.service";



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
  ],
  providers: [StarterService],
})
export class CoreModule {}
