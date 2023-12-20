import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddOrderComponent } from '../dialog-add-order/dialog-add-order.component';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Order } from 'src/models/order.class';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnDestroy, OnInit {

  firestore: Firestore = inject(Firestore);
  searchInput: string = '';
  unsubOrders;
  listOrders: any = [];
  order = new Order;
  deliveryDate!: Date;
  showOrderDetails: number | null = 1; //später auf null setzen






  constructor(public dialog: MatDialog) {
    this.unsubOrders = this.subOrdersList();
  }


  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.listOrders);

    }, 1000);

  }



  subOrdersList() {
    const q = query(this.getOrdersRef());
    return onSnapshot(q, (list) => {
      this.listOrders = [];
      list.forEach(element => {
        this.listOrders.push(this.setOrder(element.data(), element.id));
      });
    });
  }



  setOrder(obj: any, id: string,): Order {
    return {
      id: id || "",
      orderNumber: obj.orderNumber || "",
      customer: obj.customer || "",
      orderDate: obj.orderDate || "",
      deliveryDate: obj.deliveryDate || "",
      status: obj.status || "",
      note: obj.note || "",
      positions: obj.positions || "",
    }
  }


  calculateTime(obj: any) {
    const date = new Date(obj.deliveryDate)
    const dateToShow = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    return dateToShow;
  }


  getOrdersRef() {
    return collection(this.firestore, 'orders');
  }



  openDialogAddOrder() {
    console.log('Add order');
    this.dialog.open(DialogAddOrderComponent);
  }


  searchFunction(order: any) {
    return true;
  }


  ngOnDestroy(): void {
    this.unsubOrders();
  }


  toggleOrderElement(orderElement: any) {
    if (orderElement.id != this.showOrderDetails) {
      this.showOrderDetails = orderElement.id;
    } else {
      this.showOrderDetails = null;
    }
  }



}
