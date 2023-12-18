import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Customer } from 'src/models/customer.class';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';





@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnDestroy {

  searchInput: string = '';
  listCustomer: any = [];
  customer = new Customer();
  unsubCustomer;
  firestore: Firestore = inject(Firestore);




  constructor(public dialog: MatDialog) {
    this.unsubCustomer = this.subCustomerList();
  }


  subCustomerList() {
    const q = query(this.getCustomerRef());
    return onSnapshot(q, (list) => {
      this.listCustomer = [];
      list.forEach(element => {
        this.listCustomer.push(this.setUserObject(element.data(), element.id));
      });
    });
  }



  setUserObject(obj: any, id: string,): Customer {
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

  ngOnDestroy(): void {
    this.unsubCustomer();
  }



  openDialogAddCustomer() {
    //this.dialog.open(DialogAddUserComponent);

  }


  searchFunction(customer: any) {

  }





}
