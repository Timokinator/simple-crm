import { Supplier } from 'src/models/supplier.class';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Article } from 'src/models/article.class';



@Component({
  selector: 'app-dialog-delete-supplier',
  templateUrl: './dialog-delete-supplier.component.html',
  styleUrls: ['./dialog-delete-supplier.component.scss']
})
export class DialogDeleteSupplierComponent implements OnInit, OnDestroy {

  supplier!: Supplier;
  firestore: Firestore = inject(Firestore);

  loading!: boolean;
  unsubArticle;
  oldSupplier!: string;
  listArticlesToEdit: any = [];


  constructor() {
    this.unsubArticle = this.subArticleList();
    //this.oldCategory = this.category.name;
  }

  ngOnInit(): void {
    this.oldSupplier = this.supplier.name;
  }

  ngOnDestroy(): void {
    this.unsubArticle();
  }


  async deleteSupplier() {
    this.loading = true;
    await deleteDoc(doc(this.getSupplierRef(), this.supplier.id)).catch(
      (err) => { console.log(err); }
    ).then(
      () => {
        //console.log(this.listArticlesToEdit);
        this.listArticlesToEdit.forEach((element: any) => {
          this.updateSingleArticle(element);
        });
      });
  };


  getSupplierRef() {
    return collection(this.firestore, 'supplier');
  }


//Code for Articles

subArticleList() {
  const q = query(this.getArticleRef());
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
    amount: obj.amount || "",
    sum: obj.sum || ""
  }
}


async updateSingleArticle(element: any) {
  const docRef = doc(this.getArticleRef(), element.id);
  await updateDoc(docRef, { supplier: '' }).catch(
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
