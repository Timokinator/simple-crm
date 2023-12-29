import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Customer } from 'src/models/customer.class';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentReference } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-dialog-edit-customer',
  templateUrl: './dialog-edit-customer.component.html',
  styleUrls: ['./dialog-edit-customer.component.scss']
})
export class DialogEditCustomerComponent implements OnInit, OnDestroy {

  customer: Customer = new Customer();
  firestore: Firestore = inject(Firestore);
  customerNumberEdit!: string;

  listCustomer: any = [];
  unsubCustomer;
  customerNumberUnique: boolean = false;

  loading: boolean = false;
  formIncomplete: boolean = true;

  constructor(public dialog: MatDialog) {
    this.unsubCustomer = this.subCustomerList();
  }


  ngOnInit(): void {
    this.customerNumberEdit = this.customer.customerNumber;
    this.checkValidation();
  }


  checkValidation() {
    let listOfCustomerNumbers: any = [];
    this.listCustomer.forEach((element: any) => {
      listOfCustomerNumbers.push(element.customerNumber)
    });
    let neuesArray = listOfCustomerNumbers.filter((element: string) => element !== this.customer.customerNumber)
    if (neuesArray.includes(this.customerNumberEdit)) {
      this.customerNumberUnique = false
    } else {
      this.customerNumberUnique = true
    }
    if (this.customer.customerNumber && this.customerNumberUnique && this.customer.name && this.customer.city && this.customer.email && this.customer.phone && this.customer.status && this.customer.street && this.customer.zipCode) {
      this.formIncomplete = false;
    } else
      this.formIncomplete = true;
  }


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


  async updateCustomer() {
    const docRef = doc(this.getCustomerRef(), this.customer.id);
    await updateDoc(docRef, this.getCleanJson(this.customer)).catch(
      (err) => { console.log(err); }
    ).then(
      () => { }
    );
  }


  getCleanJson(obj: Customer): {} {
    return {
      id: obj.id,
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


  saveCustomer() {
    this.loading = true;
    this.customer.customerNumber = this.customerNumberEdit;
    this.updateCustomer();
  }





}
