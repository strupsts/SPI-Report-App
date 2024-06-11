import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IonDatetime, ModalController} from "@ionic/angular";
import {ReportService} from "../../services/report.service";
import { v1 as uuidv1 } from 'uuid';
import {IReport} from "../../interfaces/report-interface";

@Component({
  selector: 'spi-[modal] add-report',
  templateUrl: './add-report-modal.component.html',
  styleUrls: ['./add-report-modal.component.scss'],
})
export class AddReportModalComponent  implements OnInit {
  @ViewChild(IonDatetime) datetime!: IonDatetime;
  @Input() report?: IReport;
  @Input() mode!: 'add' | 'edit';
  reportForm!: FormGroup;

  yesterdayDate!: string;
  todayDate!: string;

  constructor(private formBuilder: FormBuilder,
              private reportService: ReportService,
              private modalCtrl: ModalController,
              private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.reportForm = this.formBuilder.group({
      action: ['', Validators.required],
    });
    this.initDates();

  }


  ngAfterViewInit() {
    // If the mode is 'edit' then fill the form with the report data
    if (this.mode === 'edit') {
      this.reportForm.patchValue({
        action: this.report?.action
      });
      console.log('AfterViewInit: ', this.datetime.value)
      this.datetime.value = this.report?.time;
      console.log('report time: : ', this.datetime.value)

      this.cdRef.detectChanges();
    }
  }

  onSubmit() {
    if (this.reportForm.valid) {
      console.log("ToLocalString",this.getISOfromLocaleTime(new Date().toLocaleString()))
      switch (this.mode) {

        case 'add':
          this.reportService.addReport({
            id: uuidv1(),
            time: this.datetime?.value || this.getISOfromLocaleTime(new Date().toLocaleString()),
            action: this.reportForm.value.action
          });
          this.modalCtrl.dismiss();
          break;
        case 'edit':
          this.reportService.editReport({
            id: this.report?.id || uuidv1(),
            time: this.datetime?.value || this.getISOfromLocaleTime(new Date().toLocaleString()),
            action: this.reportForm.value.action
          });
          this.modalCtrl.dismiss();
          break;
      }
    }
  }


  // Date - Time methods

  getISOfromLocaleTime(dateString: string) {
    let dateParts = dateString.split(", ");
    let datePart = dateParts[0].split(".").reverse().join("-");
    let timePart = dateParts[1];

    // Data validation check
    let date = new Date(`${datePart}T${timePart}`);
    if (isNaN(date.getTime())) {
      // Если дата невалидна, возвращаем текущую дату и время в формате ISO
      return new Date().toISOString();
    }

    return `${datePart}T${timePart}`;
  }

  initDates() {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.yesterdayDate = this.getISOfromLocaleTime(yesterday.toLocaleString());

    let today = new Date();
    today.setHours(today.getHours() + 8);
    this.todayDate = this.getISOfromLocaleTime(today.toLocaleString());
  }




}
