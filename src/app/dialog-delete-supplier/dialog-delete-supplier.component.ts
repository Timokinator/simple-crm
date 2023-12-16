import { Supplier } from 'src/models/supplier.class';
import { Component, OnInit, inject } from '@angular/core';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-dialog-delete-supplier',
  templateUrl: './dialog-delete-supplier.component.html',
  styleUrls: ['./dialog-delete-supplier.component.scss']
})
export class DialogDeleteSupplierComponent {

  supplier!: Supplier;
  firestore: Firestore = inject(Firestore);



  async deleteSupplier() {
    await deleteDoc(doc(this.getNoteRef(), this.supplier.id));
  }


  getNoteRef() {
    return collection(this.firestore, 'supplier');
  }




}
