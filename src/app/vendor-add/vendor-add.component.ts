import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { VendorService } from '../_services/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor-add.component.html',
  styleUrls: ['./vendor-add.component.css']
})
export class VendorComponent implements OnInit {

  form: any = {};
  vendorTypes: any;
  qrValue: string;
  href: string;
  fileName: string;
  errorMessage = '';
  formattedaddress = "";
  latitude: any = '';
  longitude: any = "";
  isSuccessful = false;
  isSignUpFailed = false;
  display = false;
  isOpted = true;
  showOverlay = true;
  longlatDisplay = false;
  gstDisplay = false;
  offerDisplay = false;
  isFssai=false;
  options = {
    componentRestrictions: {
      country: ["IN"]
    }
  }
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  elementType: 'url' | 'canvas' | 'img' = 'url';

  manual = false
  lat
  lng
  gstnDisplay: boolean = false;
  isValidationError: boolean = false

  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    this.vendorService.getStoreType().subscribe((data) => {
      this.vendorTypes = data;
      this.showOverlay = false;
    });
    this.getLocation();
  }

  ngAfterViewInit() {
    // document.getElementsByTagName('textarea').address.readOnly = false
  }

  openDeliveryOption() {
    let storeType = this.form.storetype;
    if (storeType != "LIQUOR") {
      this.isOpted = false;
    } else {
      this.form.opted = false;
      this.isOpted = true;
    }
    this.hideShowGSTandOffer(storeType);
  }

  hideShowGSTandOffer(storeType) {
    switch (storeType) {
      case 'KIRANA':
        console.log('case kirana')
        this.offerDisplay = false;
        this.gstDisplay = true;
        this.gstnDisplay = true;
        this.isFssai=false;
        break;
      case 'RESTAURANT':
        console.log('case restaurant')
        this.offerDisplay = true;
        this.gstDisplay = true;
        this.gstnDisplay = true;
        this.isFssai=true;
        break;
      default:
        console.log('default case')
        this.offerDisplay = false;
        this.gstDisplay = false;
        this.gstnDisplay = false;
        break;
    }


    // if (storeType === "RESTAURANT") {
    //   this.gstDisplay = true;
    //   this.offerDisplay = true;
    // } else {
    //   this.gstDisplay = false;
    //   this.offerDisplay = false;
    // }
  }

  onSubmit() {
    console.log(this.form)
    this.showOverlay = true;

    if (this.isValid()) {
      console.log('validation passed...')
      // this.form.address = this.formattedaddress;
      // this.form.lat = this.latitude;
      // this.form.lang = this.longitude;
      this.vendorService.addVendor(this.form).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          if (this.form.storetype === "RESTAURANT") {
            this.qrValue = "storename = " + this.form.storename;
            this.display = true;
            let data = [{
              'storename': this.form.storename,
              'storetype': this.form.storetype,
              'mobno': this.form.mobno,
              'email': this.form.email
            }]
            this.fileName = this.form.storename;
            this.qrValue = JSON.stringify(data);
          }
          this.showOverlay = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          this.showOverlay = false;
        }
      );
    } else {
      console.log('validation failed...')
      this.showOverlay = false;
    }
  }

  isValid() {
    this.isValidationError = false
    console.log('final form: ', this.form, this.isValidationError);
    if (this.form) {

      if (this.form.opted === undefined) {
        this.form.opted = false;
      }

      // validate store type
      if (this.form.storetype ? false : true) {
        this.isValidationError = true
        alert('Please select a store type.')
        return false
      }

      // validate store name
      // if (this.form.storename ? this.form.storename.trim().length === 0 : true) {
      //   this.isValidationError = true
      //   alert('Please enter a store name.')
      //   return false
      // }

      // validate phone number
      // if (this.form.phone ? this.form.phone.trim().length != 10 : true) {
      //   alert('Phone number size can not be more than and less than 10 numbers.')
      //   this.isValidationError = true
      //   return false
      // }

      // validate email
      // if (this.form.email ? this.form.email.trim().length === 0 : true) {
      //   alert('Please enter a valid email address.')
      //   this.isValidationError = true
      //   return false
      // }

      // validate formatted address
      // if (this.form.address ? this.form.address.trim().length === 0 : true) {
      //   alert('Please enter a store address.')
      //   this.isValidationError = true
      //   return false
      // }

      // validate formatted address
      // if (this.form.accId ? this.form.accId.trim().length === 0 : true) {
      //   alert('Please enter razor pay account Id.')
      //   this.isValidationError = true
      //   return false
      // }

      if (this.isValidationError) {
        return false
      } else {
        return true
      }
    }
    return false
  }

  downloadQrCode() {
    this.href = document.getElementsByTagName('img')[0].src;
  }

  public addressChange(address: any) {
    console.log('address : ', address)
    this.form.address = address.formatted_address;
    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
    console.log("lat and long for the address { " + this.latitude + " & " + this.longitude + " }");
  }

  radioSelected(t) {
    console.log('Store location selected to: ', t)
    if (t === 'auto') {
      this.getLocation()
      // this.form.address = this.form.location = ''
      delete this.form.location
      delete this.form.address
      // document.getElementsByTagName('textarea').address.readOnly = false
      this.manual = false
      console.log('form values of auto: ', this.form)
    } else {
      delete this.form.lat
      delete this.form.lang
      this.manual = true
      // document.getElementsByTagName('textarea').address.readOnly = true
      console.log('form values manual: ', this.form)
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          // console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
          this.form.lat = position.coords.latitude;
          this.form.lang = position.coords.longitude;
          // console.log(this.form)
        }
      },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
