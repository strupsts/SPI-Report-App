import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReportListComponent} from "./components/report-list/report-list.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {ReportUnitComponent} from "./components/report-unit/report-unit.component";
import {IonicModule} from "@ionic/angular";
import {ReportService} from "./services/report.service";
import {AddReportModalComponent} from "./components/[modal] add-report/add-report-modal.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ReportListComponent,
    ReportUnitComponent,
    AddReportModalComponent,
  ],
  imports: [
    IonicModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,


    SharedModule
  ],
  providers: [ReportService],
})
export class ReportModule {}
