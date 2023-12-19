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
  unsubCustomer;
  loading: boolean = false;
  //addUserForm: any;
  formIncomplete: boolean = true;
  customerNumberUnique: boolean = true;


  constructor() {
    this.unsubCustomer = this.subCustomerList();
  }








  checkValidation() {
    let listOfCustomerNumbers: any = [];
    this.listCustomer.forEach((element: any) => {
      listOfCustomerNumbers.push(element.customerNumber)
    });
    if (listOfCustomerNumbers.includes(this.customer.customerNumber)) {
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


  getCustomerRef() {
    return collection(this.firestore, 'customers');
  }

  ngOnDestroy(): void {
    this.unsubCustomer();
  }


  saveCustomer() {
    this.loading = true;
    this.addCustomer(this.setCustomerObject(this.customer, ''), 'customers')
  }

  async addCustomer(item: Customer, colId: "customers") {
    if (colId == "customers") {
      await addDoc(this.getCustomerRef(), item).catch(
        (err) => { console.error(err) }
      ).then(
        (docRef) => {
          this.loading = false;
          const newID = docRef?.id;
          this.updateCustomerWithId(item, newID);
        }
      )
    }
  }


  async updateCustomerWithId(item: Customer, id: any) {
    const docRef = doc(this.getCustomerRef(), id);
    await updateDoc(docRef, { id: id }).catch(
      (err) => { console.log(err); }
    ).then(
      () => { console.log("Update") }
    );
  }








  onNoClick() {
    console.log('Cancel')
  }



}
