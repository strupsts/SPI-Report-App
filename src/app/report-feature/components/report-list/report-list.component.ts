import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ReportService} from "../../services/report.service";
import {IReport} from "../../interfaces/report-interface";
import {catchError, finalize, map, Observable, tap, throwError} from "rxjs";
import {IonContent, IonItemSliding, ModalController} from "@ionic/angular";
import {AddReportModalComponent} from "../[modal] add-report/add-report-modal.component";
import {StatusBarStyle} from "@capacitor/status-bar";
import {StatusBarService} from "../../../shared/services/status-bar.service";

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent  implements OnInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  @ViewChildren(IonItemSliding) slidingItems!: QueryList<IonItemSliding>;

  reportsList$!: Observable<IReport[]>;

  shouldScroll: boolean = true;

  constructor(private reportService: ReportService,
              private modalCtrl: ModalController,
              private statusBarService: StatusBarService
  ) { }

  ngOnInit() {
    this.reportsList$ = this.reportService.getReportList().pipe(
      catchError((error) => {
        console.log('[SPI] Error with stream: reportList$: ', error);
        return throwError(error);
      }),

      map((reports: IReport[]) => {
        return reports.sort((a: IReport, b: IReport) => {
          const dateA = new Date(a.time);
          const dateB = new Date(b.time);
          return dateA < dateB ? -1 : 1;
       })
      }),

      tap(() => {
        this.shouldScroll = true;
      })
    );
  }

  // Scroll to the bottom of the content when the view (DOM) is entered
  ionViewDidEnter() {
    this.content.scrollToBottom(0);
  }

  // Scroll to the bottom every time when new element added to the list
  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.content.scrollToBottom(100);
      this.shouldScroll = false;
    }
  }

 /* let presentingElement: any = document.querySelector('.regarding-element') ;
  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }*/

  async addReport(event?: any) {
    event?.stopPropagation();

    // this.reportService.addReport({id: 0, time: new Date().toLocaleTimeString(), action: 'Report added '});
    const modal = await this.modalCtrl.create({
      component: AddReportModalComponent,
      componentProps: {
        mode: 'add',
      }
    })

    modal.onWillDismiss().then(() => {
      this.statusBarService.setStatusBarColor('#ffc409', {style: StatusBarStyle.Light});
    });

    modal.present();
  }



  removeReport($event: any, report: IReport) {
    $event.stopPropagation();
    this.reportService.removeReport(report.id);
  }


  async editReport($event: any, report: IReport) {
    $event.stopPropagation();

    // this.reportService.addReport({id: 0, time: new Date().toLocaleTimeString(), action: 'Report added '});
    const modal = await this.modalCtrl.create({
      component: AddReportModalComponent,
      componentProps: {
        report: report,
        mode: 'edit',
      }
    })

    modal.onWillDismiss().then(() => {
      this.statusBarService.setStatusBarColor('#ffc409', {style: StatusBarStyle.Light});
    });

    modal.present();
  }



  async toggleSlider(slidingItem: IonItemSliding) {
    if (await slidingItem.getOpenAmount() === 0) {
      console.log('opening');
      slidingItem.open('end');
    } else {
      console.log('closing')
      slidingItem.close();
    }
  }



}
