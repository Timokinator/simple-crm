import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Article } from 'src/models/article.class';
import { Category } from 'src/models/category.class';

@Component({
  selector: 'app-dialog-delete-category',
  templateUrl: './dialog-delete-category.component.html',
  styleUrls: ['./dialog-delete-category.component.scss']
})
export class DialogDeleteCategoryComponent implements OnInit, OnDestroy {

  category!: Category;
  firestore: Firestore = inject(Firestore);
  loading!: boolean;

  oldCategory!: string;

  unsubArticle;
  listArticlesToEdit: any = [];


  constructor() {
    this.unsubArticle = this.subArticleList();
    //this.oldCategory = this.category.name;
  }

  ngOnInit(): void {
    this.oldCategory = this.category.name;
  }

  ngOnDestroy(): void {
    this.unsubArticle();
  }


  async deleteCategory() {
    this.loading = true;
    await deleteDoc(doc(this.getCategoryRef(), this.category.id)).catch(
      (err) => { console.log(err); }
    ).then(
      () => {
        //console.log(this.listArticlesToEdit);
        this.listArticlesToEdit.forEach((element: any) => {
          this.updateSingleArticle(element);
        });
      });
  };


  getCategoryRef() {
    return collection(this.firestore, 'categories');
  }


  //Code for Articles

  subArticleList() {
    const q = query(this.getArticleRef());
    //, where("category", "==", this.oldCategory));
    return onSnapshot(q, (list) => {
      this.listArticlesToEdit = [];
      list.forEach(element => {
        if (element.data()['category'] == this.oldCategory) {
          this.listArticlesToEdit.push(this.setArticle(element.data()));
        };
      });
      //console.log(this.listArticlesToEdit);
    });
  }


  setArticle(obj: any): Article {
    return {
      id: obj.id || "",
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
    await updateDoc(docRef, { category: '' }).catch(
      (err) => { console.log(err); }
    ).then(
      () => {
        //console.log(element.category);
        //console.log("Update")
        this.loading = false;
      }
    );
  }


  getArticleRef() {
    return collection(this.firestore, 'articles');
  }













}
