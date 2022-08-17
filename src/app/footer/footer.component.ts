import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footerString: string = '© '+new Date().getFullYear()+' Bornbhukkad (Lova Foods Pvt Ltd ) - All Rights Reserved.'

  constructor() { }

  ngOnInit() {
  }

}
