import { Component, OnInit, inject } from '@angular/core';
import { query, orderBy, limit, where, Firestore, collection, doc, getDoc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { UserDetailComponent } from '../user-detail/user-detail.component';


@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {

  firestore: Firestore = inject(Firestore);
  loading: boolean = false;
  formIncomplete: boolean = false;
  user!: User;


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


  async updateUserAddress() {
    this.loading = true;
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
    if (this.user.city && this.user.street && this.user.zipCode) {
      this.formIncomplete = false;
    } else
      this.formIncomplete = true;
  }



}
