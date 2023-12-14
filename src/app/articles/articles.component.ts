import { Component, inject } from '@angular/core';
import { DialogAddArticleComponent } from '../dialog-add-article/dialog-add-article.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Article } from 'src/models/article.class';





@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {

  firestore: Firestore = inject(Firestore);
  displayedColumns: string[] = ['position'];
  unsubArticle: any;
  listArticle: any = [];
  article = new Article();

  constructor(public dialog: MatDialog) {
    this.unsubArticle = this.subArticleList();
  }


  subArticleList() {
    const q = query(this.getArticleRef()
      //, where("firstName", "==", "Timo")
      , limit(100), orderBy('itemNumber'));
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
    }
}



  getArticleRef() {
    return collection(this.firestore, 'articles');
  }

  ngonDestroy() {
    this.unsubArticle();
  }


  openDialog() {

    this.dialog.open(DialogAddArticleComponent);
  }


}
