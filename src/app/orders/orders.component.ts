import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddOrderComponent } from '../dialog-add-order/dialog-add-order.component';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Order } from 'src/models/order.class';
import { DialogDeleteOrderComponent } from '../dialog-delete-order/dialog-delete-order.component';
import { DialogEditOrderComponent } from '../dialog-edit-order/dialog-edit-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnDestroy, OnInit {

  @Input() inputFilterCustomer!: string;


  firestore: Firestore = inject(Firestore);
  searchInput: string = '';
  unsubOrders: any;
  listOrders: any = [];
  order = new Order();
  deliveryDateShow: string | undefined;
  orderDateShow: string | undefined;

  showOrderDetails: number | null = null;


  constructor(public dialog: MatDialog) {
    //this.unsubOrders = this.subOrdersList();

  }

  convertDate(date: any) {
    const correctDate = new Date(date)
    return correctDate.getDate() + '.' + (correctDate.getMonth() + 1) + '.' + correctDate.getFullYear()
  }

  ngOnInit(): void {
    this.unsubOrders = this.subOrdersList();
  }



  subOrdersList() {
    let q;
    if (this.inputFilterCustomer) {
      q = query(this.getOrdersRef(), where("customer.id", "==", this.inputFilterCustomer), orderBy('orderNumber'));
    } else {
      q = query(this.getOrdersRef(), orderBy('orderNumber'));
    }

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
      sum: obj.sum || ""
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
    this.dialog.open(DialogAddOrderComponent);
  }


  searchFunction(order: any) {
    if (order.orderNumber.toLowerCase().includes(this.searchInput.toLowerCase())
      || order.customer.name.toLowerCase().includes(this.searchInput.toLowerCase())
      || order.status.toLowerCase().includes(this.searchInput.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
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


  editOrder(order: any) {
    const dialog = this.dialog.open(DialogEditOrderComponent);
    dialog.componentInstance.order = new Order(order);

    dialog.afterClosed().subscribe(() => {
      this.subOrdersList();
    })

  }

  deleteOrder(order: any) {
    const dialog = this.dialog.open(DialogDeleteOrderComponent);
    dialog.componentInstance.order = new Order(order);
  }




}
