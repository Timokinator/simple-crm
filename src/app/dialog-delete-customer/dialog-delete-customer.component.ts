import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/models/customer.class';
import { query, orderBy, limit, where, Firestore, collection, doc, getDoc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';


@Component({
  selector: 'app-dialog-delete-customer',
  templateUrl: './dialog-delete-customer.component.html',
  styleUrls: ['./dialog-delete-customer.component.scss']
})
export class DialogDeleteCustomerComponent {

  customer: Customer = new Customer();
  readyToDelete: string = '';
  firestore: Firestore = inject(Firestore);


  constructor(private router: Router) {

  }


  async deleteCustomer() {
    await deleteDoc(doc(this.getCustomerRef(), this.customer.id));
    this.router.navigateByUrl(`customers`);
  }


  getCustomerRef() {
    return collection(this.firestore, 'customers');
  }



}
