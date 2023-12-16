import { Component, Inject, inject } from '@angular/core';
import { query, orderBy, limit, where, Firestore, collection, doc, getDoc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { Category } from 'src/models/category.class';

@Component({
  selector: 'app-dialog-edit-category',
  templateUrl: './dialog-edit-category.component.html',
  styleUrls: ['./dialog-edit-category.component.scss']
})
export class DialogEditCategoryComponent {

  category!: Category;

  loading!: boolean;
  formIncomplete!: boolean;

  firestore: Firestore = inject(Firestore);


  checkValidation() {
    if (this.category.name) {
      this.formIncomplete = false;
    } else
      this.formIncomplete = true;
  }


  async updateCategory() {
    const docRef = doc(this.getCategoryRef(), this.category.id);
    await updateDoc(docRef, this.getCleanJson(this.category)).catch(
      (err) => { console.log(err); }
    ).then(
      //() => { console.log("Update") }
    );
  }


  getCleanJson(obj: Category): {} {
    return {
      id: obj.id,
      name: obj.name || "",
    }
  }


  getCategoryRef() {
    return collection(this.firestore, 'categories');
  }




}
