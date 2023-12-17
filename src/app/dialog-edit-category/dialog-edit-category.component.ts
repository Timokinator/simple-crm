import { Component, Inject, OnInit, OnDestroy, inject } from '@angular/core';
import { query, orderBy, limit, where, Firestore, collection, doc, getDoc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { Category } from 'src/models/category.class';
import { Article } from 'src/models/article.class';

@Component({
  selector: 'app-dialog-edit-category',
  templateUrl: './dialog-edit-category.component.html',
  styleUrls: ['./dialog-edit-category.component.scss']
})
export class DialogEditCategoryComponent implements OnInit, OnDestroy {

  category!: Category;

  loading!: boolean;
  formIncomplete!: boolean;

  firestore: Firestore = inject(Firestore);

  oldCategory!: string;
  unsubArticle;
  listArticlesToEdit = [];

  ngOnInit(): void {
    this.oldCategory = this.category.name;
  }

  ngOnDestroy(): void {
    this.unsubArticle();
  }


  constructor() {
    this.unsubArticle = this.updateAllArticle();
  }



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
      () => {
        this.updateAllArticle();
      }

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



  //Code for Article:


  getArticleRef() {
    return collection(this.firestore, 'articles');
  }


  updateAllArticle() {
    const q = query(this.getArticleRef(), where("category", "==", this.oldCategory));
    return onSnapshot(q, (list) => {
      list.forEach(element => {
        //this.listArticlesToEdit.push(this.setArticle(element.data(), element.id));
      });
    });
  }


  setArticle(obj: any, id: string,): Article {
    return {
      id: id || "",
      itemNumber: obj.itemNumber || "",
      itemDesc: obj.itemDesc || "",
      price: obj.price || "",
      category: obj.category || "",
      supplier: obj.supplier || "",
      status: obj.status || "",
    }
  }

  async updateSingleArticle(element: any) {
    const docRef = doc(this.getArticleRef(), element.id);
    await updateDoc(docRef, { category: this.category.name }).catch(
      (err) => { console.log(err); }
    ).then(
      () => {
        //console.log("Update")
        //this.loading = false;
      }
    );
  }


}
