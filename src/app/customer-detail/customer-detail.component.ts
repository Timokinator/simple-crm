import { Component, OnDestroy, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { query, orderBy, limit, where, Firestore, collection, doc, getDoc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { Customer } from 'src/models/customer.class';
import { DialogEditCustomerComponent } from '../dialog-edit-customer/dialog-edit-customer.component';
import { DialogDeleteCustomerComponent } from '../dialog-delete-customer/dialog-delete-customer.component';



@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnDestroy {

  activatedRoute = inject(ActivatedRoute);
  routeId: any;
  customerID: any;
  unsubCustomer;
  firestore: Firestore = inject(Firestore);
  customer: Customer = new Customer();
  dataLoaded: boolean = false;


  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.routeId = this.route.params;
    this.customerID = this.routeId['_value']['id'];
    this.unsubCustomer = onSnapshot(doc(this.firestore, 'customers', this.customerID), (doc) => {
      this.loadCustomer();
    });
  };


  async loadCustomer() {
    const docRef = doc(this.firestore, "customers", this.customerID);
    const docSnap = await getDoc(docRef);
    this.writeCustomer(docSnap);
    //this.setUser(docSnap);
  }


  writeCustomer(docSnap: DocumentSnapshot<DocumentData, DocumentData>) {
    if (docSnap.exists()) {
      this.customer = new Customer(docSnap.data());
      //console.log(this.user);
      this.dataLoaded = true;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }


  editCustomer() {
    const dialog = this.dialog.open(DialogEditCustomerComponent);
    dialog.componentInstance.customer = new Customer(this.customer);
  }


  deleteCustomer() {
    const dialog = this.dialog.open(DialogDeleteCustomerComponent);
    dialog.componentInstance.customer = new Customer(this.customer);
  }


  ngOnDestroy(): void {
    this.unsubCustomer();
  }

}
