import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderAlertService {

  constructor(private http: HttpClient) { }

  placeOrder(order): Observable<any> {
    // let url = environment. + ''
    return this.http.post('url', order)
  }
}
