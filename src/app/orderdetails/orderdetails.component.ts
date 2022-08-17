import { Component, OnInit, TemplateRef } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Order } from '../_helpers/order';
import { Product } from '../_helpers/product';
import { ItemService } from '../_services/item.service';
import { ProductService } from '../_services/productservice';
import { ReportsService } from '../_services/reports.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  productDialog: boolean;
  selectedOrder: Order[];
  submitted: boolean;
  orderList: any;
  statuses: SelectItem[];
  dropDownDisabled = false;
  showOverlay = true;
  order: { orderId?: string; totalPrice?: string; paymentStatus?: string; orderedDate?: number; userMobNo?: string; paymentMode?: string; orderStatus?: string; };
  tableValue: string = 'incoming_orders';
  modalRef: BsModalRef;

  dummyOrders = []
  dummyOrder: any = {}

  constructor(
    private reportService: ReportsService,
    private tokenStorage: TokenStorageService,
    private messageService: MessageService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.statuses = [{ label: 'COMPLETED', value: 'COMPLETED' }, { label: 'NOT COMPLETED', value: 'NOT COMPLETED' }]
    this.getAllOrders();
  }

  getAllOrders() {
    const storeId = this.tokenStorage.getUser().storeId;

    console.log("storeId----------", storeId)
    this.reportService.orderHistoryByVendor(storeId).subscribe((data) => {
      this.orderList = data;
      this.showOverlay = false;
    });
  }

  editOrder(order: Order) {
    this.showOverlay = true;
    this.order = { ...order };
    this.productDialog = true;
    this.dropDownDisabled = true;
    this.showOverlay = false;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.orderList);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "orderdetails");
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

  saveProduct() {
    this.submitted = true;
    this.showOverlay = true;
    const userId = this.tokenStorage.getUser().id;
    if (this.order.orderId.trim()) {
      if (this.order.orderId) {
        this.reportService.updateDeliveryStatus(this.order.orderId, this.order.orderStatus, userId).subscribe(
          data => {
            this.getAllOrders();
            this.showOverlay = false;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Delivery details updated.', life: 3000 });
            this.productDialog = false;
            this.order = {};
          },
          err => {
            this.showOverlay = false;
            console.log(err.error.message);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Failed to update delivery details.', life: 3000 });
          }
        );
      }
    }


  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.orderList.length; i++) {
      if (this.orderList[i].orderId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  openModal(template: TemplateRef<any>, order) {
    this.modalRef = this.modalService.show(template);
    let keys = Object.keys(order)
    let values = Object.values(order)
    // this.dummyOrder['keys'] = keys
    // this.dummyOrder['values'] = values
    let list = ''
    // for i in 



    keys.forEach(key => {
      let idx = keys.indexOf(key)
      list += "<tr><td>" + keys[idx] + "</td><td>" + values[idx] + "</td><td><input type='checkbox'></td></tr>"
    });
    console.log('html list: ', list)
    let tbody = document.getElementById('modelTbody')
    tbody.innerHTML = list
  }
}
