import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-bankdetails',
  templateUrl: './bankdetails.component.html',
  styleUrls: ['./bankdetails.component.css']
})
export class BankdetailsComponent implements OnInit {
  form:any = {}

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }
  showToaster(){
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bank details added successfully.', life: 4000 });
  }

  onSubmit(){
    console.log('form submitted')
  }

}
