import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BankDetailsService } from './bank-details.service';

@Component({
  selector: 'app-bankdetails',
  templateUrl: './bankdetails.component.html',
  styleUrls: ['./bankdetails.component.css']
})
export class BankdetailsComponent implements OnInit {
  form: any = {}

  constructor(private messageService: MessageService, private bankDetailService: BankDetailsService) { }

  ngOnInit() {
  }
  showToaster() {
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bank details added successfully.', life: 4000 });
  }

  onSubmit(f) {
    console.log('form submitted', f)
    this.bankDetailService.addBankDetails(f).subscribe((res) => {
      console.log('res: ', res)
    }, (err) => {
      console.log('err: ', err)
    })
  }

}
