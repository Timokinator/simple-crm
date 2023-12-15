import { Component, inject } from '@angular/core';
import { Article } from 'src/models/article.class';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-delete-article',
  templateUrl: './dialog-delete-article.component.html',
  styleUrls: ['./dialog-delete-article.component.scss']
})
export class DialogDeleteArticleComponent {

  article!: Article;
  firestore: Firestore = inject(Firestore);



  async deleteArticle() {
    await deleteDoc(doc(this.getArticleRef(), this.article.id));
    
  }


  getArticleRef() {
    return collection(this.firestore, 'articles');
  }



}
