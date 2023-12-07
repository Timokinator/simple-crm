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
