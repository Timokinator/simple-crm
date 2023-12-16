import { Component, Inject, inject } from '@angular/core';
import { query, orderBy, limit, where, Firestore, collection, doc, getDoc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { Supplier } from 'src/models/supplier.class';


@Component({
  selector: 'app-dialog-edit-supplier',
  templateUrl: './dialog-edit-supplier.component.html',
  styleUrls: ['./dialog-edit-supplier.component.scss']
})
export class DialogEditSupplierComponent {

  supplier!: Supplier;
  loading!: boolean;
  formIncomplete!: boolean;

  firestore: Firestore = inject(Firestore);





  checkValidation() {
    if (this.supplier.name) {
      this.formIncomplete = false;
    } else
      this.formIncomplete = true;
  }


  async updateSupplier() {
    const docRef = doc(this.getSupplierRef(), this.supplier.id);
    await updateDoc(docRef, this.getCleanJson(this.supplier)).catch(
      (err) => { console.log(err); }
    ).then(
      //() => { console.log("Update") }
    );
  }


  getCleanJson(obj: Supplier): {} {
    return {
      id: obj.id,
      name: obj.name || "",
    }
  }


  getSupplierRef() {
    return collection(this.firestore, 'supplier');
  }



}
