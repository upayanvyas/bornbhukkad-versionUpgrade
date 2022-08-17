import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ItemService } from '../_services/item.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemListComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  formattedaddress = "";
  itemCategoryList: any;
  itemStatusList: any;
  itemQuantityList: any;
  showOverlay = true;
  otherSelected = false;
  otherQuantity = false;
  isBulk = false

  weightUnitList = [
    { unit: ['gigatonne	(Gt)', '1000000000000000', 'in gm'] },
    { unit: ['megatonne	(Mt)', '1000000000000', 'in gm'] },
    { unit: ['tonne	(t)', '1000000', 'in gm'] },
    { unit: ['kilogram	(kg)', '1000', 'in gm'] },
    { unit: ['gram	(g)', '1', 'in gm'] },
    { unit: ['milligram	(mg)', '0.001', 'in gm'] },
    { unit: ['microgram	(µg)', '0.000001', 'in gm'] },
    { unit: ['nanogram	(ng)', '0.000000001', 'in gm'] },
    { unit: ['picogram	(pg)', '0.000000000001', 'in gm'] }]
  fileToUpload: any;

  constructor(private itemService: ItemService, private tokenStorage: TokenStorageService
    , private messageService: MessageService, private http: HttpClient) { }

  ngOnInit() {
    const storeId = this.tokenStorage.getUser().storeId;
    const storeType = this.tokenStorage.getUser().storeType;

    this.itemService.getItemCategory(storeId, storeType).subscribe((data) => {
      this.itemCategoryList = data;
    });

    this.itemService.getItemStatus().subscribe((data) => {
      this.itemStatusList = data;
    });

    this.itemService.getItemQuantity(storeId, storeType).subscribe((data) => {
      this.itemQuantityList = data;
      console.log('this.itemQuantityList : ', this.itemQuantityList)
      this.showOverlay = false;
    });
  }

  onSubmit() {
    console.log('form submission: ', this.form)
    const storeType = this.tokenStorage.getUser().storeType;
    this.showOverlay = true;
    
    if (this.isBulk){
      this.form = {
        file: this.fileToUpload
      }
    }

    this.itemService.addItem(this.form, storeType, this.isBulk).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showOverlay = false;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Item added successfully.', life: 4000 });
        window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.showOverlay = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.errorMessage, life: 4000 });
      }
    );
    // }
    // else {
    //   this.uploadFile(this.fileToUpload)
    // }

  }

  otherItemSelected() {
    this.otherSelected = this.form.itemCategory === 'others' ? true : false
    this.form.itemCategory = this.form.itemCategory
    this.form.itemCategory === 'others' ? this.form.categoryName : delete this.form["categoryName"];
  }

  otherQuantitySelected() {
    // console.log(this.form.itemQuantity)
    this.otherQuantity = this.form.itemQuantity === 'others' ? true : false
    this.form.itemQuantity = this.form.itemQuantity
    this.form.itemQuantity === 'others' ? this.form.quantityMeasure : delete this.form["quantityMeasure"];
  }

  bulkUpload() {
    if (this.isBulk) {
      this.isBulk = false;
    } else {
      this.isBulk = true;
      this.form = {}
    }
  }

  onFileSelect(f) {
    console.log(f)
    this.fileToUpload = f.item(0);
    console.log(this.fileToUpload)
  }

  // call this method when you want the upload to begin
  // uploadFile(fileToUpload: File): Observable<boolean> {
  //   const endpoint = 'backend-upload-url';
  //   const formData: FormData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);
  //   return this.httpClient
  //     .post(endpoint, formData)
  //     .map(() => { return true; })
  //     .catch((e) => this.handleError(e));
  // }

  uploadFile(fileToUpload: File) {
    const endpoint = 'backend-upload-url';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    console.log('inside upload file: ', fileToUpload)
    // this.http.post(endpoint, formData).subscribe((res) => {
    //   console.log(res)
    // }, (err) => {
    //   console.log(err)
    // })
  }

}

