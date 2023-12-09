import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { query, orderBy, limit, where, Firestore, collection, doc, getDoc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dialog-delete-user',
  templateUrl: './dialog-delete-user.component.html',
  styleUrls: ['./dialog-delete-user.component.scss']
})
export class DialogDeleteUserComponent {

  firestore: Firestore = inject(Firestore);
  user!: User;
  readyToDelete: string = '';


  constructor(private route: ActivatedRoute, private router: Router) {

  }


  async deleteUser() {
    await deleteDoc(doc(this.getUserRef(), this.user.id));
    this.router.navigateByUrl(`user`);
  }


  getUserRef() {
    return collection(this.firestore, 'users');
  }

}
