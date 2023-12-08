import { Component, OnInit, inject } from '@angular/core';
import { query, orderBy, limit, where, Firestore, collection, doc, getDoc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { UserDetailComponent } from '../user-detail/user-detail.component';


@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {

  firestore: Firestore = inject(Firestore);
  loading: boolean = false;
  formIncomplete: boolean = false;
  userId: string | undefined;
  user!: User;


  ngOnInit(): void {
    this.loggingAddress();
   
  }


  loggingAddress() {
    setInterval(() => {
      console.log(this.user.street);
      console.log(this.user.id);
        
    }, 1000);

  }






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
    const docRef = doc(this.getUserRef(), this.user.id);
    console.log(docRef);
    await updateDoc(docRef, this.getCleanJson(this.user)).catch(
      (err) => { console.log(err); }
    ).then(
      () => { console.log("Update") }
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


  onNoClick() {

  }


  saveUser() {

  }



}
