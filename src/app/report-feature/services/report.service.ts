import { Injectable } from '@angular/core';
import * as PizZip from 'pizzip';
import * as Docxtemplater from 'docxtemplater';
import { IReport } from '../interfaces/report-interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { StorageService } from '../../shared/services/storage.service';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Base64 } from 'js-base64';

@Injectable()
export class ReportService {
  public reportListSubject: BehaviorSubject<IReport[]> = new BehaviorSubject<IReport[]>([]);
  public reportList: Observable<IReport[]> = this.reportListSubject.asObservable();

  nextId: number = 0;

  constructor(private storageService: StorageService) {}

  initReportService() {
    this.storageService.get('reportList')?.then(reportList => {
      if (reportList) {
        console.log('[SPI] Report list loaded', reportList);
        this.reportListSubject.next(reportList);
        this.nextId = reportList.length + 1;
      } else {
        console.log('[SPI] Report list is empty');
      }
    });
  }

  async generateDocx() {
    try {
      console.log('Starting generateDocx');

      const response = await fetch('/assets/template.docx');
      const templateArrayBuffer = await response.arrayBuffer();
      console.log('Template fetched');

      const zip = new PizZip(templateArrayBuffer);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      console.log('Docxtemplater initialized');

      this.reportList.pipe(take(1)).subscribe(async (reports) => {
        console.log('Reports fetched:', reports);

        const data = {
          reportList: reports?.map(report => ({ time: this.getFormattedTime(report.time), action: report.action })),
          date: { date: new Date().toLocaleDateString() }
        };
        console.log('Data prepared:', data);

        doc.render(data);
        console.log('Document rendered');

        const buffer = doc.getZip().generate({ type: 'arraybuffer' });
        console.log('ArrayBuffer generated');

        const uint8Array = new Uint8Array(buffer);
        const base64Data = Base64.fromUint8Array(uint8Array);
        console.log('Document converted to base64');

        await Filesystem.writeFile({
          path: 'Security_Report.docx',
          data: base64Data,
          directory: Directory.Documents,
        });
        console.log('Document written to filesystem');

        console.log('[SPI] Report generated successfully');
      });
    } catch (error) {
      console.error('[SPI] Error generating report:', error);
    }
  }

  // CRUD операции
  getReportList(): Observable<IReport[]> {
    return this.reportList;
  }

  addReport(report: IReport) {
    this.reportListSubject.next([...this.reportListSubject.getValue(), report]);
    this.storageService.set('reportList', this.reportListSubject.getValue());
  }

  editReport(report: IReport) {
    const updatedReportList = this.reportListSubject.getValue().map(item => {
      if (item.id === report.id) {
        return report;
      }
      return item;
    });
    this.reportListSubject.next(updatedReportList);
    this.storageService.set('reportList', updatedReportList);
  }

  removeReport(reportId: string) {
    const updatedReportList = this.reportListSubject.getValue().filter(item => item.id !== reportId);
    this.reportListSubject.next(updatedReportList);
    this.storageService.set('reportList', updatedReportList);
  }

  getFormattedTime(time: string) {
    const date = new Date(time);
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }
}
