import { Component, inject } from '@angular/core';
import { query, orderBy, limit, where, Firestore, collection, doc, getDoc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { Supplier } from 'src/models/supplier.class';


@Component({
  selector: 'app-dialog-add-supplier',
  templateUrl: './dialog-add-supplier.component.html',
  styleUrls: ['./dialog-add-supplier.component.scss']
})
export class DialogAddSupplierComponent {

  firestore: Firestore = inject(Firestore);


  supplier = new Supplier();
  loading!: boolean;
  formIncomplete!: boolean;


  checkValidation() {
    if (this.supplier.name) {
      this.formIncomplete = false;
    } else
      this.formIncomplete = true;
  }


  saveSupplier() {
    this.loading = true;
    //console.log(this.category)
    this.addSupplier(this.setSupplier(this.supplier, ''), 'supplier')
  }


  async addSupplier(item: Supplier, colId: "supplier") {
    if (colId == "supplier") {
      await addDoc(this.getSupplierRef(), item).catch(
        (err) => { console.error(err) }
      ).then(
        (docRef) => {
          this.loading = false;
          const newID = docRef?.id;
          this.updateSupplierWithId(item, newID);
        }
      )
    }
  }

  async updateSupplierWithId(item: Supplier, id: any) {
    const docRef = doc(this.getSupplierRef(), id);
    await updateDoc(docRef, this.getCleanJson(item, id)).catch(
      (err) => { console.log(err); }
    ).then(
      //() => { console.log("Update") }
    );
  }


  getCleanJson(obj: Supplier, newIDid: any): {} {
    return {
      id: newIDid,
      name: obj.name || "",
    }
  }



  getSupplierRef() {
    return collection(this.firestore, 'supplier');
  }

  setSupplier(obj: any, id: string,): Supplier {
    return {
      id: id || "",
      name: obj.name || "",
    }
  }





}
