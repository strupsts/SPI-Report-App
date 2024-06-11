import {Component, Input, OnInit} from '@angular/core';
import {IReport} from "../../interfaces/report-interface";

@Component({
  selector: 'spi-report-unit',
  templateUrl: './report-unit.component.html',
  styleUrls: ['./report-unit.component.scss'],
})
export class ReportUnitComponent implements OnInit {

  @Input() report!: IReport;

  constructor() { }

  ngOnInit() {}

}
