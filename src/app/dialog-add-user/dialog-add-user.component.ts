import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);
  user = new User();
  listUser: any = [];
  birthDate!: Date;
  unsubUser: any;
  loading: boolean = false;

  constructor() {
    this.unsubUser = this.subUserList();
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


  async addUser(item: User, colId: "users") {
    if (colId == "users") {
      await addDoc(this.getUserRef(), item).catch(
        (err) => { console.error(err) }
      ).then(
        (docRef) => {
          this.loading = false;
          console.log("Document written with ID: ", docRef?.id);
        }
      )
    }
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

    console.log(this.user)
    this.addUser(this.setUserObject(this.user, ''), 'users')
  }

  onNoClick() {
    console.log('no')
  }


  ngonDestroy() {
    this.unsubUser();
  }










}
