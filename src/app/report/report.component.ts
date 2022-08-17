import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../_services/excel.service';
import { ReportsService } from '../_services/reports.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  display = false;
  showOverlay = true;
  data: any = [];
  barChart: any;
  pieChart: any;
  userRegdCount: any;
  tempData: any = [];
  actualData: any = [];
  userCount: any = [];
  createdDate: any = [];
  constructor(private excelService: ExcelService, private reportService: ReportsService) {
    this.showOverlay = false;

    this.reportService.getVendorRegdByMonth().subscribe((data) => {
      this.tempData = data;
      this.showOverlay = false;
      for (var ele in this.tempData) {
        this.actualData.push(this.tempData[ele]);
      }
      this.barChart = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Vendors Onboarded',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: this.actualData
          }
        ]
      }
    });

    this.reportService.getVendorCountsByType().subscribe((data) => {
      this.tempData = data;
      this.showOverlay = false;
      this.pieChart = {
        labels: ['KIRANA', 'RESTAURANT', 'LIQUIOR'],
        datasets: [
          {
            data: [this.tempData.kiranaCounts, this.tempData.restroCounts, this.tempData.liquiorCounts],
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ]
          }]
      };

    });


    this.reportService.getUserCounts().subscribe((data) => {
      this.tempData = data;
      this.showOverlay = false;
      for (var ele in this.tempData) {
        this.userCount.push(this.tempData[ele].userCounts);
        this.createdDate.push(this.tempData[ele].createdDate);
      }
      this.userRegdCount = {
        labels: this.createdDate,
        datasets: [
          {
            label: 'Users Onboarded',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: this.userCount
          }
        ]
      }
    });

  }

  ngOnInit() {
  }

  getData(): void {
    this.showOverlay = true;
    this.reportService.getVendorsByUser().subscribe((data) => {
      this.showOverlay = false;
      this.data = data;
      this.excelService.exportAsExcelFile(this.data, 'VendorRegistartionUserwise');
    });
    return this.data;
  }

  paymentSettlement(): void {
    this.showOverlay = true;
    this.reportService.getPaymentSettlement().subscribe((data) => {
      this.showOverlay = false;
      this.data = data;
      this.excelService.exportAsExcelFile(this.data, 'PaymentSettlement');
    });
    return this.data;
  }

}
