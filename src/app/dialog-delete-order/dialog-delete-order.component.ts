import { Component, inject } from '@angular/core';
import { Order } from 'src/models/order.class';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-delete-order',
  templateUrl: './dialog-delete-order.component.html',
  styleUrls: ['./dialog-delete-order.component.scss']
})
export class DialogDeleteOrderComponent {

  order!: Order;
  firestore: Firestore = inject(Firestore);



  async deleteOrder() {
    await deleteDoc(doc(this.getArticleRef(), this.order.id));

  }


  getArticleRef() {
    return collection(this.firestore, 'orders');
  }



}
