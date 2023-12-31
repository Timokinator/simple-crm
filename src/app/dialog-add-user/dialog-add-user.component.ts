import { Component, OnInit, OnDestroy, inject, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/models/user.class';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentReference } from '@angular/fire/firestore';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnDestroy {
  firestore: Firestore = inject(Firestore);
  user = new User();
  listUser: any = [];
  birthDate!: Date;
  unsubUser;
  loading: boolean = false;
  //addUserForm: any;
  formIncomplete: boolean = true;


  constructor() {
    this.unsubUser = this.subUserList();
  }


  checkValidation() {
    if (this.user.firstName && this.user.lastName && this.user.email && this.birthDate && this.user.city && this.user.street && this.user.zipCode) {
      this.formIncomplete = false;
    } else
      this.formIncomplete = true;

  }


  subUserList() {
    return onSnapshot(this.getUserRef(), (list) => {
      this.listUser = [];
      list.forEach(element => {
        this.listUser.push(this.setUserObject(element.data(), element.id));
      });
    });
  }


  setUserObject(obj: any, id: string,): User {
    return {
      id: id || "",
      firstName: obj.firstName || "",
      lastName: obj.lastName || "",
      birthDate: obj.birthDate || 0,
      street: obj.street || "",
      zipCode: obj.zipCode || "",
      city: obj.city || "",
      email: obj.email || ""
    }
  }


  getCleanJson(obj: User, newIDid: any): {} {
    return {
      id: newIDid,
      firstName: obj.firstName || "",
      lastName: obj.lastName || "",
      birthDate: obj.birthDate || 0,
      street: obj.street || "",
      zipCode: obj.zipCode || "",
      city: obj.city || "",
      email: obj.email || ""
    }
  }


  async addUser(item: User, colId: "users") {
    if (colId == "users") {
      await addDoc(this.getUserRef(), item).catch(
        (err) => { console.error(err) }
      ).then(
        (docRef) => {
          this.loading = false;
          const newID = docRef?.id;
          this.updateUserWithId(item, newID);
        }
      )
    }
  }


  async updateUserWithId(item: User, id: any) {
    const docRef = doc(this.getUserRef(), id);
    await updateDoc(docRef, this.getCleanJson(item, id)).catch(
      (err) => { console.log(err); }
    ).then(
      () => { console.log("Update") }
    );

  }



  getUserRef() {
    return collection(this.firestore, 'users');
  }


  saveUser() {
    this.loading = true;
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
    } else {
      this.user.birthDate = 0;
    }

    //console.log(this.user)
    this.addUser(this.setUserObject(this.user, ''), 'users')
  }

  onNoClick() {
    console.log('Cancel')
  }


  ngOnDestroy(): void {
    this.unsubUser();
  }










}
