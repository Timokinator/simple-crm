import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Article } from 'src/models/article.class';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentReference } from '@angular/fire/firestore';
import { Category } from 'src/models/category.class';
import { Supplier } from 'src/models/supplier.class';
import { DialogAddCategoryComponent } from '../dialog-add-category/dialog-add-category.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddSupplierComponent } from '../dialog-add-supplier/dialog-add-supplier.component';


@Component({
  selector: 'app-dialog-edit-article',
  templateUrl: './dialog-edit-article.component.html',
  styleUrls: ['./dialog-edit-article.component.scss']
})
export class DialogEditArticleComponent implements OnInit, OnDestroy {


  article!: Article;
  firestore: Firestore = inject(Firestore);
  itemNumberEdit!: string;

  listArticles: any = [];
  unsubArticle;
  itemNumberUnique: boolean = false;

  loading: boolean = false;
  formIncomplete: boolean = true;

  category = new Category();
  unsubCategory;
  listCategories: any = [];

  unsubSupplier;
  supplier = new Supplier();
  listSupplier: any = [];



  constructor(public dialog: MatDialog) {
    this.unsubArticle = this.subArticleList();
    this.unsubCategory = this.subCategoryList();
    this.unsubSupplier = this.subSupplierList();
  }

  ngOnInit(): void {
    this.itemNumberEdit = this.article.itemNumber;
    this.checkValidation();
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
        //console.log(this.article);
        this.checkValidation();

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
    //console.log('add');
    const dialog = this.dialog.open(DialogAddSupplierComponent);
    // dialog.category = new Category();

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.article.supplier = result.name;
        //console.log(this.article);
        this.checkValidation();
      }
    });


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
      amount: obj.amount || "",
      sum: obj.sum || ""
    }
  }

  getCleanJsonArticle(obj: Article): {} {
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



  getArticleRef() {
    return collection(this.firestore, 'articles');
  }


  checkValidation() {
    let listOFItemNumbers: any = [];
    this.listArticles.forEach((element: any) => {
      listOFItemNumbers.push(element.itemNumber)
    });
    let neuesArray = listOFItemNumbers.filter((element: string) => element !== this.article.itemNumber)

    if (neuesArray.includes(this.itemNumberEdit)) {
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
    this.article.itemNumber = this.itemNumberEdit;
    //console.log(this.article)
    this.updateArticle();
  }


  async updateArticle() {
    const docRef = doc(this.getArticleRef(), this.article.id);
    await updateDoc(docRef, this.getCleanJsonArticle(this.article)).catch(
      (err) => { console.log(err); }
    ).then(
      () => {
        console.log("Update")
        console.log(this.article);
        this.loading = false;
      }
    );
  }



ngOnDestroy(): void {
  this.unsubCategory();
  this.unsubArticle();
  this.unsubSupplier();
}








}
