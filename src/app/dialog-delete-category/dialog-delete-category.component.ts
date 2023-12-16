import { Component, OnInit, inject } from '@angular/core';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Category } from 'src/models/category.class';

@Component({
  selector: 'app-dialog-delete-category',
  templateUrl: './dialog-delete-category.component.html',
  styleUrls: ['./dialog-delete-category.component.scss']
})
export class DialogDeleteCategoryComponent {

  category!: Category;
  firestore: Firestore = inject(Firestore);



  async deleteCategory() {
    await deleteDoc(doc(this.getNoteRef(), this.category.id));
  }


  getNoteRef() {
    return collection(this.firestore, 'categories');
  }



}
