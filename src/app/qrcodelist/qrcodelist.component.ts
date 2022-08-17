import { Component, OnInit } from '@angular/core';
import { VendorService } from '../_services/vendor.service';

interface Vendor {
  name: string,
  code: string
}

@Component({
  selector: 'app-qrcodelist',
  templateUrl: './qrcodelist.component.html',
  styleUrls: ['./qrcodelist.component.css']
})
export class QrcodelistComponent implements OnInit {

  finalVendorList: Vendor[];
  selectedVendor: Vendor;
  showOverlay = true;
  vendorsList;
  finalVendors: Vendor[];
  qrValue: string;
  display = false;
  fileName: string;
  href:string;

  constructor(private vendorService: VendorService) {

    this.vendorService.getAllVendors().subscribe((data) => {
      this.vendorsList = data;
      this.finalVendors = [];
      for (let i = 0; i < this.vendorsList.length; i++) {
        // if (data[i].storetype === "RESTAURANT") {
          this.finalVendors.push({
            name: data[i].storename +"-"+ data[i].storetype,
            code: data[i].storename
          });
        // }
      };
      this.showOverlay = false;
    });
  }

  ngOnInit() {
  }


  onChangeVendor(event) {
    if(event === null) {
      this.display = false;
      return;
    }
    this.vendorsList.forEach(element => {
      if(element.storename === event.code) {
        let data = [{
          'storeid': element.id,
          'storename': element.storename,
          'storetype': element.storetype,
          'mobno': element.phone,
          'razorPayAccId': element.accId,
          'email': element.email,
          'deliveryAllowed': element.opted
        }]
        this.qrValue = JSON.stringify(data);
        this.display = true;
        this.fileName = element.storename+".png";
      }
      // this.downloadQrCode();
    });
  }

  downloadQrCode() {
    this.href = document.getElementsByTagName('img')[0].src;
  }

}
