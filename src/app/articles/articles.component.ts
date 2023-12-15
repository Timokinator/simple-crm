import { Component, inject } from '@angular/core';
import { DialogAddArticleComponent } from '../dialog-add-article/dialog-add-article.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Article } from 'src/models/article.class';
import { DialogEditArticleComponent } from '../dialog-edit-article/dialog-edit-article.component';
import { DialogDeleteArticleComponent } from '../dialog-delete-article/dialog-delete-article.component';





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
  searchInput: string = "";


  constructor(public dialog: MatDialog) {
    this.unsubArticle = this.subArticleList();
  }


  complexSearchFunction(article: any) {
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


  editArticle(article: Article) {
    console.log('edit' + article);
    const dialog = this.dialog.open(DialogEditArticleComponent);
    dialog.componentInstance.article = new Article(article);
  }


  deleteArticle(article: Article) {
    console.log('delete' + article);
    const dialog = this.dialog.open(DialogDeleteArticleComponent);
    dialog.componentInstance.article = new Article(article);
  }





}
