import { Component, OnInit, inject } from '@angular/core';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Category } from 'src/models/category.class';

@Component({
  selector: 'app-dialog-delete-category',
  templateUrl: './dialog-delete-category.component.html',
  styleUrls: ['./dialog-delete-category.component.scss']
})
export class DialogDeleteCategoryComponent implements OnInit {

  category!: Category;
  firestore: Firestore = inject(Firestore);

  oldCategory!: string;


  ngOnInit(): void {
    this.oldCategory = this.category.name;
  }


  async deleteCategory() {
    await deleteDoc(doc(this.getNoteRef(), this.category.id));
    this.updateAllArticle();
  }


  getNoteRef() {
    return collection(this.firestore, 'categories');
  }


  getArticleRef() {
    return collection(this.firestore, 'articles');
  }


  updateAllArticle() {
    const q = query(this.getArticleRef(), where("category", "==", this.oldCategory));
    return onSnapshot(q, (list) => {
      list.forEach(element => {
        console.log(list);
        this.updateSingleArticle(element);
      });
    });
  }


  async updateSingleArticle(element: any) {
    const docRef = doc(this.getArticleRef(), element.id);
    await updateDoc(docRef, { category: '' }).catch(
      (err) => { console.log(err); }
    ).then(
      () => {
        //console.log("Update")
        //this.loading = false;
      }
    );
  }








}
