import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentReference } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/models/article.class';
import { Customer } from 'src/models/customer.class';
import { Order } from 'src/models/order.class';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DialogAddPositionToOrderComponent } from '../dialog-add-position-to-order/dialog-add-position-to-order.component';




@Component({
  selector: 'app-dialog-add-order',
  templateUrl: './dialog-add-order.component.html',
  styleUrls: ['./dialog-add-order.component.scss']
})
export class DialogAddOrderComponent implements OnDestroy {


  firestore: Firestore = inject(Firestore);
  unsubOrders;
  listOrders: any = [];
  order = new Order();

  unsubArticle;
  listArticle: any = [];
  article = new Article();

  unsubCustomer;
  listCustomer: any = [];
  customer = new Customer();

  loading: boolean = false;
  orderNumberUnique!: boolean;
  formIncomplete!: boolean;

  orderDate!: Date;
  deliveryDate!: Date;


  constructor(public dialog: MatDialog) {
    this.unsubOrders = this.subOrdersList();
    this.unsubArticle = this.subArticleList();
    this.unsubCustomer = this.subCustomerList();
    this.order.status = "Pending";

  }


  //Code for Orders

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
      sum: obj.sum || ""
    }
  }

  getOrdersRef() {
    return collection(this.firestore, 'orders');
  }

  //Code for Articles

  subArticleList() {
    const q = query(this.getArticleRef(), limit(100), orderBy('itemNumber'));
    return onSnapshot(q, (list) => {
      this.listArticle = [];
      list.forEach(element => {
        this.listArticle.push(this.setArticle(element.data(), element.id));
      });
    });
  }


  setArticle(obj: any, id: string,): Article {
    return {
      id: id || "",
      itemNumber: obj.itemNumber || "",
      itemDesc: obj.itemDesc || "",
      price: obj.price || "",
      category: obj.category || "",
      supplier: obj.supplier || "",
      status: obj.status || "",
      amount: obj.amount || "",
      sum: obj.sum || ""
    }
  }


  getArticleRef() {
    return collection(this.firestore, 'articles');
  }



  //Code for Customers

  subCustomerList() {
    const q = query(this.getCustomerRef());
    return onSnapshot(q, (list) => {
      this.listCustomer = [];
      list.forEach(element => {
        this.listCustomer.push(this.setCustomerObject(element.data(), element.id));
      });
    });
  }



  setCustomerObject(obj: any, id: string,): Customer {
    return {
      id: id || "",
      customerNumber: obj.customerNumber || "",
      name: obj.name || "",
      street: obj.street || "",
      zipCode: obj.zipCode || "",
      city: obj.city || "",
      email: obj.email || "",
      phone: obj.phone || "",
      status: obj.status || "",
      infotext: obj.infotext || "",
    }
  }

  getCustomerRef() {
    return collection(this.firestore, 'customers');
  }





  checkValidation() {
    console.log(this.order);

  }


  saveOrder() {
    console.log('save');

  }


  ngOnDestroy(): void {
    this.unsubOrders();
    this.unsubArticle();
    this.unsubCustomer();
  }



  openDialogAddPosition() {
    console.log('add position');
    const dialog = this.dialog.open(DialogAddPositionToOrderComponent);
    // dialog.category = new Category();
    dialog.afterClosed().subscribe(result => {
      if (result) {
        const newArticle = this.setArticle(result, result.id);
        this.order.positions.push(newArticle);
      }
    });
  }



  calculateSum(article: Article) {
    article.sum = article.amount * article.price
  }

  deletePosition(i: any) {
    this.order.positions.splice(i, 1)
  }




}