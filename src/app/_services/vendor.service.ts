import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Vendor } from '../_helpers/vendor';
import { TokenStorageService } from './token-storage.service';

const BASE_ITEM_URL = environment.ITEM_API_URL;
const BASE_AUTH_URL = environment.AUTH_API_URL;
const BASE_VENDOR_URL = environment.VENDOR_API_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }


  addVendor(vendor): Observable<Vendor> {
    const userId = this.tokenStorage.getUser().id;
    let vendorType = vendor.storetype;
    let stateGST = 0;
    let centralGST = 0;
    let defOffer = 0;
    let gstn = 0;
    let fssai = 0;

    if(vendorType === "RESTAURANT") {
      stateGST = vendor.sGST;
      centralGST = vendor.cGST;
      defOffer = vendor.offer;
      gstn = vendor.gstn;
      fssai=vendor.fssai;
    }else if(vendorType === "KIRANA"){
      stateGST = vendor.sGST;
      centralGST = vendor.cGST;
      gstn = vendor.gstn;
    }
    return this.http.post(BASE_VENDOR_URL + 'addVendor', {
      storetype: vendorType,
      storename: vendor.storename,
      address: vendor.address,
      email: vendor.email,
      opted: vendor.opted,
      phone: vendor.phone,
      accId: vendor.accId,
      userId: userId,
      latitude: vendor.lat,
      longitude: vendor.lang,
      cGST: centralGST,
      sGST: stateGST,
      offerPercen: defOffer,
      fssai:vendor.fssai,
      gstn:gstn
    }, httpOptions);
  }

  getAllVendors() {
    return this.http.get(BASE_VENDOR_URL + 'getAllVendors');
  }

  getStoreType() {
    return this.http.get(BASE_VENDOR_URL + 'getStoreType');
  }

  updateStoreStatus(storeStatus) {
    const storeId = this.tokenStorage.getUser().storeId;
    const userId = this.tokenStorage.getUser().id;
    return this.http.get(BASE_VENDOR_URL + 'updateStoreStatus?storeStatus=' + storeStatus + '&storeId=' + storeId + '&userId=' + userId);
  }

  getStoreStatus() {
    const storeId = this.tokenStorage.getUser().storeId;
    return this.http.get(BASE_VENDOR_URL + 'getStoreStatus?&storeId=' + storeId);
  }

}
