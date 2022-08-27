import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderAlertService } from './order-alert.service';

@Component({
  selector: 'app-order-alert',
  templateUrl: './order-alert.component.html',
  styleUrls: ['./order-alert.component.css']
})
export class OrderAlertComponent implements OnInit {
  order: any
  keys = []
  order_bkp

  constructor(private activatedRoute: ActivatedRoute, private orderAlertService: OrderAlertService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let order = params['order'];
      order = JSON.parse(order)

      let order_bkp = params['order'];
      order_bkp = JSON.parse(order_bkp)
      this.order_bkp = order_bkp

      console.log('order:  ', order);
      this.order = this.getTableBody(order)
    });
  }

  getTableBody(order) {
    this.keys = []
    for (const key in order) {
      this.keys.push(key)
      if (Object.prototype.hasOwnProperty.call(order, key)) {
        const value = order[key];
        order[key] = [value, 0]
      }
    }
    console.log('orders: ', order)
    return order
  }

  addToList(item) {
    if (this.order[item][1] === 0) {
      this.order[item][1] = 1
    } else {
      this.order[item][1] = 0
    }
    // console.log('final list of  acceptedItems: ', this.acceptedItems)
    console.log('final list of  orders: ', this.order)
  }

  acceptOrReject(choice) {
    let finalOrder = {}
    if (choice != 'accept') {
      if (confirm('Are you really want to reject this order?')) {
        finalOrder = this.getTableBody(this.order_bkp)
        this.placeOrder(finalOrder, choice)
      }
    } else {
      finalOrder = this.order
      this.placeOrder(finalOrder, choice)
    }
  }

  placeOrder(order, choice) {
    console.log(`place order APi called for ${choice}: `)
    console.table(order)
    // this.orderAlertService.placeOrder(finalOrder).subscribe((res) => {
    //   console.log('res: ', res)
    // }, (err) => {
    //   console.log('err: ', err)
    // })
  }
}
