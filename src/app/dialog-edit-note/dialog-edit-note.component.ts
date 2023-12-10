import { Component, OnInit, inject } from '@angular/core';
import { Note } from 'src/models/note.class';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';




@Component({
  selector: 'app-dialog-edit-note',
  templateUrl: './dialog-edit-note.component.html',
  styleUrls: ['./dialog-edit-note.component.scss']
})
export class DialogEditNoteComponent implements OnInit {

  firestore: Firestore = inject(Firestore);
  note!: Note;
  loading: boolean = false;
  formIncomplete: boolean = true;
  listUser: any = [];
  unsubUser: any;


  constructor() {
    this.unsubUser = this.subUserList();
  }

  ngOnInit(): void {
    this.checkValidation();
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


  getCleanJson(obj: Note): {} {
    return {
      id: obj.id,
      title: obj.title || "",
      content: obj.content || "",
      user: obj.user || ""
    }
  }


  async updateNote() {
    const docRef = doc(this.getNoteRef(), this.note.id);
    await updateDoc(docRef, this.getCleanJson(this.note)).catch(
      (err) => { console.log(err); }
    ).then(
      () => {
        console.log("Update")
        this.loading = false;
      }
    );
  }


  checkValidation() {
    if (this.note.title && this.note.user) {
      this.formIncomplete = false;
    } else
      this.formIncomplete = true;

  }


  saveNote() {
    this.loading = true;
    this.updateNote();

  }


  getUserRef() {
    return collection(this.firestore, 'users');
  }


  getNoteRef() {
    return collection(this.firestore, 'notes');
  }


}
