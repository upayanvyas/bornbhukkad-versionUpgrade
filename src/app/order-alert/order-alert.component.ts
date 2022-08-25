import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-order-alert',
  templateUrl: './order-alert.component.html',
  styleUrls: ['./order-alert.component.css']
})
export class OrderAlertComponent implements OnInit {
  order: any
  acceptedItems = {}

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let order = params['order'];
      order = JSON.parse(order)
      console.log('order:  ', order);
      this.getTableBody(order)
      // this.order = parsedOrder
      // let keys = Object.keys(parsedOrder);
      // let values = Object.values(parsedOrder);
      // this.order['keys'] = keys
      // this.order['values'] = values
      // this.order['available'] = []
    });
  }

  getTableBody(order) {
    let rows = ''
    for (const key in order) {
      if (Object.prototype.hasOwnProperty.call(order, key)) {
        const value = order[key];
        order[key] = [value, 0]
        rows += "<tr><td>" + key + "</td><td>" + value + "</td><td>" + "<input type='checkbox' (click)='addToList(" + key + ")'></td>" + "</tr>"
      }
    }
    let tbody = document.querySelector("#myDiv")
    tbody.innerHTML = rows
  }

  addToList(item) {
    console.log(item)
    if (this.acceptedItems.hasOwnProperty(item)) {
      delete this.acceptedItems[item]
    } else {
      let idx = this.order.keys.indexOf(item)
      this.acceptedItems[item] = this.order.values[idx]
    }
    console.log('final list: ', this.acceptedItems)
  }

}
