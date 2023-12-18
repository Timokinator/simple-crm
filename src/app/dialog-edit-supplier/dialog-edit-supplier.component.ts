import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { query, orderBy, limit, where, Firestore, collection, doc, getDoc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { Supplier } from 'src/models/supplier.class';
import { Article } from 'src/models/article.class';


@Component({
  selector: 'app-dialog-edit-supplier',
  templateUrl: './dialog-edit-supplier.component.html',
  styleUrls: ['./dialog-edit-supplier.component.scss']
})
export class DialogEditSupplierComponent implements OnInit, OnDestroy {

  supplier!: Supplier;
  loading!: boolean;
  formIncomplete!: boolean;

  firestore: Firestore = inject(Firestore);

  oldSupplier: string = '';
  unsubArticle;
  listArticlesToEdit: any = [];


  constructor() {
    this.unsubArticle = this.subArticleList();
  }

  ngOnInit(): void {
    this.oldSupplier = this.supplier.name;
  }

  ngOnDestroy(): void {
    this.unsubArticle();
  }


  checkValidation() {
    if (this.supplier.name) {
      this.formIncomplete = false;
    } else
      this.formIncomplete = true;
  }


  async updateSupplier() {
    this.loading = true;
    const docRef = doc(this.getSupplierRef(), this.supplier.id);
    await updateDoc(docRef, this.getCleanJson(this.supplier)).catch(
      (err) => { console.log(err); }
    ).then(
      () => {
        this.listArticlesToEdit.forEach((element: any) => {
          this.updateSingleArticle(element);
        });
      }
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



  //Code for Article

  getArticleRef() {
    return collection(this.firestore, 'articles');
  }


  subArticleList() {
    const q = query(this.getArticleRef());
    //, where("category", "==", this.oldCategory));
    return onSnapshot(q, (list) => {
      this.listArticlesToEdit = [];
      list.forEach(element => {
        if (element.data()['supplier'] == this.oldSupplier) {
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
    await updateDoc(docRef, { supplier: this.supplier.name }).catch(
      (err) => { console.log(err); }
    ).then(
      () => {
        //console.log(element.category);
        //console.log("Update")
        this.loading = false;
      }
    );
  }






}
