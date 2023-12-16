import { Component, OnInit, OnDestroy, inject, ViewChild, ElementRef } from '@angular/core';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentReference } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Article } from 'src/models/article.class';
import { Category } from 'src/models/category.class';
import { DialogAddCategoryComponent } from '../dialog-add-category/dialog-add-category.component';
import { Supplier } from 'src/models/supplier.class';
import { DialogAddSupplierComponent } from '../dialog-add-supplier/dialog-add-supplier.component';



@Component({
  selector: 'app-dialog-add-article',
  templateUrl: './dialog-add-article.component.html',
  styleUrls: ['./dialog-add-article.component.scss']
})
export class DialogAddArticleComponent implements OnInit {

  firestore: Firestore = inject(Firestore);

  article = new Article();
  listArticles: any = [];
  unsubArticle: any;
  itemNumberUnique: boolean = true;

  loading: boolean = false;
  formIncomplete: boolean = true;

  category = new Category();
  unsubCategory: any;
  listCategories: any = [];

  unsubSupplier: any;
  supplier = new Supplier();
  listSupplier: any = [];


  constructor(public dialog: MatDialog) {
    this.unsubArticle = this.subArticleList();
    this.unsubCategory = this.subCategoryList();
    this.unsubSupplier = this.subSupplierList();
  }


  //Code für categories:


  subCategoryList() {
    return onSnapshot(this.getCategoryRef(), (list) => {
      this.listCategories = [];
      list.forEach(element => {
        this.listCategories.push(this.setCategoryObject(element.data(), element.id));
      });
    });
  }


  getCategoryRef() {
    return collection(this.firestore, 'categories');
  }

  setCategoryObject(obj: any, id: string,): Category {
    return {
      id: id || "",
      name: obj.name || ""

    }
  }


  addCategory() {
    //console.log('add');
    const dialog = this.dialog.open(DialogAddCategoryComponent);
    // dialog.category = new Category();
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.article.category = result.name;
      }
    });
  }


  //Code für supplier

  subSupplierList() {
    return onSnapshot(this.getSupplierRef(), (list) => {
      this.listSupplier = [];
      list.forEach(element => {
        this.listSupplier.push(this.setSupplierObject(element.data(), element.id));
      });
    });
  }


  getSupplierRef() {
    return collection(this.firestore, 'supplier');
  }


  setSupplierObject(obj: any, id: string,): Supplier {
    return {
      id: id || "",
      name: obj.name || ""

    }
  }


  addSupplier() {
    const dialog = this.dialog.open(DialogAddSupplierComponent);
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.article.supplier = result.name;
      }
    });
  }


  ngOnInit(): void {

  }


  //Code für articles:


  subArticleList() {
    return onSnapshot(this.getArticleRef(), (list) => {
      this.listArticles = [];
      list.forEach(element => {
        this.listArticles.push(this.setArticle(element.data(), element.id));
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


  getCleanJson(obj: Article, newIDid: any): {} {
    return {
      id: newIDid,
      itemNumber: obj.itemNumber || "",
      itemDesc: obj.itemDesc || "",
      price: obj.price || "",
      category: obj.category || "",
      supplier: obj.supplier || "",
      status: obj.status || "",
    }
  }


  getArticleRef() {
    return collection(this.firestore, 'articles');
  }


  checkValidation() {
    let listOFItemNumbers: any = [];
    this.listArticles.forEach((element: any) => {
      listOFItemNumbers.push(element.itemNumber)
    });
    if (listOFItemNumbers.includes(this.article.itemNumber)) {
      this.itemNumberUnique = false
    } else {
      this.itemNumberUnique = true
    }
    if (this.article.itemNumber && this.itemNumberUnique && this.article.itemDesc && this.article.category && this.article.price && this.article.supplier && this.article.status) {
      this.formIncomplete = false;
    } else
      this.formIncomplete = true;
  }


  saveArticle() {
    this.loading = true;
    this.addArticle(this.setArticle(this.article, ''), 'articles')
  }


  onNoClick() {
    console.log('Cancel')
  }


  async addArticle(item: Article, colId: "articles") {
    if (colId == "articles") {
      await addDoc(this.getArticleRef(), item).catch(
        (err) => { console.error(err) }
      ).then(
        (docRef) => {
          this.loading = false;
          const newID = docRef?.id;
          this.updateArticleWithId(item, newID);
        }
      )
    }
  }


  async updateArticleWithId(item: Article, id: any) {
    const docRef = doc(this.getArticleRef(), id);
    await updateDoc(docRef, this.getCleanJson(item, id)).catch(
      (err) => { console.log(err); }
    ).then(
      () => {

      }
    );

  }


  ngonDestroy() {
    this.unsubCategory();
    this.unsubArticle();
    this.unsubSupplier();
  }


}
