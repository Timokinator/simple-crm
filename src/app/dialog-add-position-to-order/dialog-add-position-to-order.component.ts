import { Component, Inject, inject } from '@angular/core';
import { Article } from 'src/models/article.class';
import { query, orderBy, limit, where, Firestore, collection, doc, getDoc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';






@Component({
  selector: 'app-dialog-add-position-to-order',
  templateUrl: './dialog-add-position-to-order.component.html',
  styleUrls: ['./dialog-add-position-to-order.component.scss']
})
export class DialogAddPositionToOrderComponent {

  firestore: Firestore = inject(Firestore);
  article: Article = new Article();
  unsubArticle;
  listArticle: any = [];
  searchInput: string = '';


  constructor(
    public dialog: MatDialogRef<DialogAddPositionToOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.unsubArticle = this.subArticleList();
  }



  subArticleList() {
    const q = query(this.getArticleRef(), limit(100), orderBy('itemNumber'));
    return onSnapshot(q, (list) => {
      this.listArticle = [];
      list.forEach(element => {
        this.listArticle.push(this.setArticle(element.data(), element.id));
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


  getArticleRef() {
    return collection(this.firestore, 'articles');
  }





  searchFunction(article: any) {
    if (article.itemNumber.toLowerCase().includes(this.searchInput.toLowerCase())
      || article.itemDesc.toLowerCase().includes(this.searchInput.toLowerCase())
      || article.category.toLowerCase().includes(this.searchInput.toLowerCase())
      || article.supplier.toLowerCase().includes(this.searchInput.toLowerCase())
      || article.status.toLowerCase().includes(this.searchInput.toLowerCase())
      || article.price.toString().includes(this.searchInput.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  }


  

}
