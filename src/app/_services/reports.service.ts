import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage.service';

const BASE_REPORTS_URL = environment.REPORTS_API_URL;
const BASE_ORDER_URL = environment.ORDER_API_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReportsService {


  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getVendorsByUser() {
    return this.http.get(BASE_REPORTS_URL + 'getVendorByUser');
  }

  getVendorRegdByMonth() {
    return this.http.get(BASE_REPORTS_URL + 'getVendorRegdByMonth');
  }

  orderHistoryByVendor(storeId) {
    return this.http.get(BASE_ORDER_URL + 'orderHistoryByVendor?vendorId=' + storeId);
  }

  updateDeliveryStatus(orderId, deliveryStatus, userId) {
    return this.http.get(BASE_ORDER_URL + 'updateDeliveryStatus?orderId=' + orderId + '&deliveryStatus=' + deliveryStatus + '&userId=' + userId);
  }

  getPaymentSettlement() {
    return this.http.get(BASE_REPORTS_URL + 'paymentSettlement');
  }

  getVendorCountsByType() {
    return this.http.get(BASE_REPORTS_URL + 'getStoreTypeCounts');
  }

  getUserCounts() {
    return this.http.get(BASE_REPORTS_URL + 'getUserCounts');
  }

}
