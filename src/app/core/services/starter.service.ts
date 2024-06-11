import { Injectable } from '@angular/core';
import {StorageService} from "../../shared/services/storage.service";
import {ReportService} from "../../report-feature/services/report.service";
import {StatusBarService} from "../../shared/services/status-bar.service";
import {StatusBarStyle} from "@capacitor/status-bar";

@Injectable({
  providedIn: 'root'
})
export class StarterService {

  constructor(private storageService: StorageService,
              private reportService: ReportService,
              private statusBarService: StatusBarService
  ) { }

  async initializeApp(): Promise<void> {
    try {
      await this.storageService.initStorage();
      await this.reportService.initReportService();

      console.log('[SPI] App initialized successfully');
    } catch (error) {
      console.error('[SPI] App initialization failed', error);
      throw error;
    }

  }


}
