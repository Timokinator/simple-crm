import { Component, inject } from '@angular/core';
import { Note } from 'src/models/note.class';
import { User } from 'src/models/user.class';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentReference } from '@angular/fire/firestore';


@Component({
  selector: 'app-dialog-add-note',
  templateUrl: './dialog-add-note.component.html',
  styleUrls: ['./dialog-add-note.component.scss']
})
export class DialogAddNoteComponent {

  loading: boolean = false;
  note = new Note();
  formIncomplete: boolean = true;
  user = new User;
  firestore: Firestore = inject(Firestore);
  listUser: any = [];
  unsubUser: any;



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

  getUserRef() {
    return collection(this.firestore, 'users');
  }



  checkValidation() {
    if (this.note.title && this.note.user) {
      this.formIncomplete = false;
    } else
      this.formIncomplete = true;

  }



  onNoClick() {

  }


  saveNote() {
    console.log(this.note);

    
  }


}
