import { Component, OnDestroy, inject } from '@angular/core';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentReference } from '@angular/fire/firestore';
import { Customer } from 'src/models/customer.class';



@Component({
  selector: 'app-dialog-add-customer',
  templateUrl: './dialog-add-customer.component.html',
  styleUrls: ['./dialog-add-customer.component.scss']
})
export class DialogAddCustomerComponent implements OnDestroy {
  firestore: Firestore = inject(Firestore);
  customer = new Customer();
  listCustomer: any = [];
  //unsubCustomer;
  loading: boolean = false;
  //addUserForm: any;
  formIncomplete: boolean = true;


  constructor() {
    //this.unsubCustomer = this.subCustomerList();
  }











  ngOnDestroy(): void {
    //this.unsubCustomer();
  }



}
