import { Component } from '@angular/core';
import {StarterService} from "./core/services/starter.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private starterService: StarterService) {
    this.starterService.initializeApp();
  }
}
