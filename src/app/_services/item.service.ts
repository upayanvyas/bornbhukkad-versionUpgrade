import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../../environments/environment';

const BASE_ITEM_URL = environment.ITEM_API_URL;
const BASE_VENDOR_URL = environment.VENDOR_API_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }


  addItem(item, storeType, isBulk): Observable<any> {
    const storeId = this.tokenStorage.getUser().storeId;
    if (!isBulk) {
      let obj = {
        itemName: item.itemName,
        itemCategory: item.itemCategory,
        itemStatus: item.itemStatus,
        itemQuantity: item.itemQuantity,
        itemPrice: item.itemPrice,
        vendorId: storeId,
        unit: item.unit
      }
      item.itemCategory === 'others' ? obj['newCategory'] = item.categoryName : ''
      item.itemQuantity === 'others' ? obj['newQuantity'] = item.quantityMeasure : ''

      return this.http.post(BASE_ITEM_URL + 'addItem?storeType=' + storeType, obj, httpOptions);
    } else {
      const formData: FormData = new FormData();
      formData.append('fileKey', item.file);
      
      let httpOptions1 = {
        //headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
        headers: new HttpHeaders()
      }
      let obj = {
        vendorId: storeId
        
      }
      console.log('httpOptions : ', httpOptions1)
      return this.http.post(BASE_ITEM_URL + 'addItem_excel?storeType=' + storeType + '&vendorId=' + storeId, formData, httpOptions1);
    }
  }

  getAllVendors() {
    return this.http.get(BASE_VENDOR_URL + 'getAllVendors');
  }

  getItemCategory(storeId, storeType) {
    return this.http.get(BASE_ITEM_URL + 'getItemCategory?aVendorId=' + storeId + '&storeType=' + storeType);
  }

  getItemStatus() {
    return this.http.get(BASE_ITEM_URL + 'getItemStatus');
  }

  getItemQuantity(storeId, storeType) {
    return this.http.get(BASE_ITEM_URL + 'getItemQuantity?aVendorId=' + storeId + '&storeType=' + storeType);
  }

  getAllItems(storeId) {
    return this.http.get(BASE_ITEM_URL + 'getItemsByVendor?aVendorId=' + storeId);
  }

  updateItem(item): Observable<any> {
    const storeId = this.tokenStorage.getUser().storeId;
    return this.http.post(BASE_ITEM_URL + 'updateItemDetails', {
      itemName: item.itemname,
      itemCategory: item.itemcategory,
      itemStatus: item.itemstatus,
      itemQuantity: item.itemquantity,
      itemPrice: item.itemprice,
      vendorId: storeId,
      id: item.id
    }, httpOptions);
  }

  deleteItem(id): Observable<any> {
    return this.http.delete(BASE_ITEM_URL + 'deleteItem?id=' + id);
  }

}
