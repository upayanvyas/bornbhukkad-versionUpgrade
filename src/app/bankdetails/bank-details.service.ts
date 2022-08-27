import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankDetailsService {

  constructor(private http: HttpClient) { }

  addBankDetails(details):Observable<any> {
    return this.http.post('url', details)
  }


}
