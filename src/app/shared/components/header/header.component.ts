import {Component, Input, OnInit} from '@angular/core';
import {ModalController, Platform} from "@ionic/angular";
import {StatusBarService} from "../../services/status-bar.service";
import {StatusBarStyle} from "@capacitor/status-bar";
import {ReportService} from "../../../report-feature/services/report.service";

@Component({
  selector: 'spi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() headerTitle!: string;
  @Input() headerColor!: string;
  @Input() modalMode?: 'edit' | 'add' ;

  constructor(private modalCtrl: ModalController,
              private statusBarService: StatusBarService,
              private reportService: ReportService,
  ) {
  }

  ngOnInit() {
    if (this.modalMode === 'edit') {
      this.statusBarService.setStatusBarColor('#6030FF', {style: StatusBarStyle.Dark});

    }
    else if (this.modalMode === 'add') {
      this.statusBarService.setStatusBarColor('#0054e9', {style: StatusBarStyle.Dark});
    }
    else {
      this.setDefaultStatusBarColor()
    }
  }

  ngOnDestroy() {
    console.log('Header component destroyed');
  }

  // Scroll to the bottom every time when new element added to the list
  ngAfterViewInit() {

  }


  closeModal() {
    this.modalCtrl.dismiss();
    this.setDefaultStatusBarColor();
  }

  getDOCX() {
    console.log('Get DOCX');
    this.reportService.generateDocx();


  }

  setDefaultStatusBarColor() {
    this.statusBarService.setStatusBarColor('#ffc409', {style: StatusBarStyle.Light});
  }
}
