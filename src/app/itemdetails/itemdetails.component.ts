import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Product } from '../_helpers/product';
import { ItemService } from '../_services/item.service';
import { ProductService } from '../_services/productservice';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html',
  styleUrls: ['./itemdetails.component.css']
})
export class ItemdetailsComponent implements OnInit {

  productDialog: boolean;
  products: Product[];
  product: Product;
  selectedProducts: Product[];
  submitted: boolean;
  itemList: any;
  statuses: SelectItem[];
  itemCategoryList: SelectItem[];
  itemQuantityList: SelectItem[];
  dropDownDisabled = false;
  showOverlay = true;

  constructor(private itemService: ItemService, private productService: ProductService, private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.statuses = [{ label: 'AVAILABLE', value: 'AVAILABLE' }, { label: 'LOW AVAILABLE', value: 'LOW AVAILABLE' }, { label: 'NOT AVAILABLE', value: 'NOT AVAILABLE' }]
    this.getAllItems();
  }

  getAllItems() {
    const storeId = this.tokenStorage.getUser().storeId;
    const storeType = this.tokenStorage.getUser().storeType;
    this.itemService.getAllItems(storeId).subscribe((data) => {
      this.itemList = data;
    }); 
    this.itemService.getItemCategory(storeId,storeType).subscribe((data) => {
      this.itemCategoryList = this.convertToObject(data);
    });
    this.itemService.getItemQuantity(storeId , storeType).subscribe((data) => {
      this.itemQuantityList = this.convertToObject(data);
      this.showOverlay = false;
    });
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.itemList);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "itemlist");
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

  convertToObject(data: any): SelectItem<any>[] {
    let finalObject = [];
    for (let i = 0; i < data.length; i++) {
      finalObject.push({
        label: data[i],
        value: data[i]
      });
    };
    return finalObject;
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
    this.dropDownDisabled = false;
  }

  editProduct(product: Product) {
    this.showOverlay = true;
    this.product = { ...product };
    this.productDialog = true;
    this.dropDownDisabled = true;
    this.showOverlay = false;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.itemname + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showOverlay = true;
        this.products = this.itemList.filter(val => val.id !== product.id);
        this.product = {};
        this.itemService.deleteItem(product.id).subscribe(
          data => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Item Deleted', life: 3000 });
            this.getAllItems();
          },
          err => {
            console.log(err.error.message);
            this.showOverlay = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Failed to delete item' });
          }
        );
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    this.showOverlay = true;
    const storeId = this.tokenStorage.getUser().storeId;
    if (this.product.itemname.trim()) {
      if (this.product.id) {
        this.itemService.updateItem(this.product).subscribe(
          data => {
            this.getAllItems();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Item details updated', life: 3000 });
            this.products = [...this.itemList];
            this.productDialog = false;
            this.product = {};
          },
          err => {
            console.log(err.error.message);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Failed to update item details', life: 3000 });
          }
        );
      } else {
        this.product.vendorId = storeId;
        const storeType = this.tokenStorage.getUser().storeType;
        this.itemService.addItem(this.product, storeType, false).subscribe(
          data => {
            this.getAllItems();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Item details created', life: 3000 });
            this.products = [...this.itemList];
            this.productDialog = false;
            this.product = {};
          },
          err => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Item details failed to create', life: 3000 });
          }
        );
      }
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

}
