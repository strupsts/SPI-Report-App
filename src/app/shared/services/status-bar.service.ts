import { Injectable } from '@angular/core';
import {StatusBar, StatusBarStyle, StatusBarStyleOptions} from "@capacitor/status-bar";
import {Platform} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {

  constructor(private platform: Platform) { }

  setStatusBarColor(color: string, style: StatusBarStyleOptions): void {
    if(this.platform.is('capacitor')) {
      StatusBar.setBackgroundColor({ color: color }); // Оранжевый цвет
      StatusBar.setStyle(style)

    }

  }
}
