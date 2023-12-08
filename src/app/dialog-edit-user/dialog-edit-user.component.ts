import { Component, OnInit, inject } from '@angular/core';
import { query, orderBy, limit, where, Firestore, collection, doc, getDoc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { timestamp } from 'rxjs';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {

  firestore: Firestore = inject(Firestore);
  user!: User;
  loading: boolean = false;
  formIncomplete: boolean = false;
  birthDate!: Date;

  getCleanJson(obj: User): {} {
    return {
      id: obj.id,
      firstName: obj.firstName || "",
      lastName: obj.lastName || "",
      birthDate: obj.birthDate || 0,
      street: obj.street || "",
      zipCode: obj.zipCode || "",
      city: obj.city || "",
      email: obj.email || ""
    }
  }

  async updateUserHeader() {
    this.loading = true;
    const birthDayInMs = new Date(this.birthDate);
    this.user.birthDate = birthDayInMs.getTime();
    const docRef = doc(this.getUserRef(), this.user.id);
    //console.log(docRef);
    await updateDoc(docRef, this.getCleanJson(this.user)).catch(
      (err) => { console.log(err); }
    ).then(
      () => {
        console.log("Update")
        this.loading = false;
      }
    );
  }


  getUserRef() {
    return collection(this.firestore, 'users');
  }


  checkValidation() {
    if (this.user.firstName && this.user.lastName && this.user.birthDate && this.user.email) {
      this.formIncomplete = false;
    } else
      this.formIncomplete = true;
  }


}
