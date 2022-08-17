import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { VendorService } from '../_services/vendor.service';

@Component({
  selector: 'app-vendorslist',
  templateUrl: './vendorslist.component.html',
  styleUrls: ['./vendorslist.component.css']
})
export class VendorslistComponent implements OnInit {

  showOverlay = true;
  vendorsList;
  public gridOptions: GridOptions;

  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    this.vendorService.getAllVendors().subscribe((data) => {
      this.vendorsList = data;
      this.showOverlay = false;
    });
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.vendorsList);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "vendordetails");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }
}
