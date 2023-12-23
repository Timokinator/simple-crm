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
  selector: 'app-dialog-edit-order',
  templateUrl: './dialog-edit-order.component.html',
  styleUrls: ['./dialog-edit-order.component.scss']
})
export class DialogEditOrderComponent implements OnDestroy, OnInit {

  order!: Order;
  firestore: Firestore = inject(Firestore);
  orderNumberEdit!: string;

  minDate!: Date;
  unsubOrders;
  listOrders: any = [];

  unsubArticle;
  listArticle: any = [];
  article = new Article();

  unsubCustomer;
  listCustomer: any = [];
  //customer = new Customer();

  loading: boolean = false;
  orderNumberUnique: boolean = false;
  formIncomplete: boolean = true;

  orderDate!: Date;
  deliveryDate!: Date;


  constructor(public dialog: MatDialog) {
    this.unsubOrders = this.subOrdersList();
    this.unsubArticle = this.subArticleList();
    this.unsubCustomer = this.subCustomerList();
    const heute = new Date();
    this.minDate = new Date(heute.getFullYear(), heute.getMonth(), heute.getDate());
  }

  ngOnInit(): void {
    this.orderNumberEdit = this.order.orderNumber;

  }

  //Code for Orders

  subOrdersList() {
    const q = query(this.getOrdersRef());
    return onSnapshot(q, (list) => {
      this.listOrders = [];
      list.forEach(element => {
        this.listOrders.push(this.setOrder(element.data(), element.id));
      });
      this.orderDate = new Date(this.order.orderDate);
      this.deliveryDate = new Date(this.order.deliveryDate);
      this.checkValidation();
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
      this.setCustomerToForm()
    }
    );

  }



  setCustomerToForm() {
    if (this.listCustomer.length > 0) {
      const newCustomerSet = this.listCustomer.find((c: any) => c.id === this.order.customer.id)
      this.order.customer = newCustomerSet;
    }
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
    let listOfOrderNumbers: any = [];
    this.listOrders.forEach((element: any) => {
      listOfOrderNumbers.push(element.orderNumber)
    });
    let neuesArray = listOfOrderNumbers.filter((element: string) => element !== this.order.orderNumber)


    if (neuesArray.includes(this.orderNumberEdit)) {
      this.orderNumberUnique = false
    } else {
      this.orderNumberUnique = true
    }

    if (this.orderNumberUnique && this.order.orderNumber && this.order.customer && this.orderDate && this.deliveryDate) {
      this.formIncomplete = false;
    } else
      this.formIncomplete = true;
  }


  saveOrder() {
    this.loading = true;
    this.order.orderNumber = this.orderNumberEdit;
    this.getDates();
    this.updateOrder();
  }


  getDates() {
    if (this.deliveryDate) {
      this.order.deliveryDate = this.deliveryDate.getTime();
    } else {
      this.order.deliveryDate = 0
    };

    if (this.orderDate) {
      this.order.orderDate = this.orderDate.getTime();
    } else {
      this.order.orderDate = 0
    };
  }


  async updateOrder() {
    const docRef = doc(this.getOrdersRef(), this.order.id);
    await updateDoc(docRef, this.setOrder(this.order, this.order.id)).catch(
      (err) => { console.log(err); }
    ).then(
      () => {
        this.loading = false;
      }
    );
  }




  openDialogAddPosition() {
    const dialog = this.dialog.open(DialogAddPositionToOrderComponent);
    // dialog.category = new Category();
    dialog.afterClosed().subscribe(result => {
      if (result) {
        const newArticle = this.setArticle(result, result.id);
        this.order.positions.push(newArticle);
      }
    });
  }

  checkAmount(article: any) {
    const newValue = Math.floor(article.amount);
    article.amount = newValue;
    if (article.amount < 0) {
      article.amount = 0;
    }
  }

  calculateSumPosition(article: Article) {
    //this.checkAmount(article)
    //article.amount = Math.floor(article.amount);
    if (article.amount < 0) {
      article.amount = 0;
    }
    //article.amount = Math.floor(article.amount);

    article.sum = article.amount * article.price
  }

  deletePosition(i: any) {
    this.order.positions.splice(i, 1)
  }


  calculateSumOrder() {
    let newSumOrder: number = 0;
    this.order.positions.forEach(element => {
      newSumOrder += element.sum;
    });

    this.order.sum = newSumOrder;

  }







  ngOnDestroy(): void {
    this.unsubOrders();
    this.unsubArticle();
    this.unsubCustomer();
  }



}
