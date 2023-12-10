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
  firestore: Firestore = inject(Firestore);
  listUser: any = [];
  unsubUser: any;
  user = new User();



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


  async addNote(item: Note, colId: "notes") {
    if (colId == "notes") {
      await addDoc(this.getNoteRef(), item).catch(
        (err) => { console.error(err) }
      ).then(
        (docRef) => {
          const newID = docRef?.id;
          this.updateNoteWithId(item, newID);
        }
      )
    }
  }

  async updateNoteWithId(item: Note, id: any) {
    const docRef = doc(this.getNoteRef(), id);
    await updateDoc(docRef, this.getCleanJson(item, id)).catch(
      (err) => { console.log(err); }
    ).then(
      () => {
        this.loading = true
        console.log("Update")
      }
    );
  }


  setNoteObject(obj: any, id: string,): Note {
    return {
      id: id || "",
      title: obj.title || "",
      content: obj.content || "",
      user: obj.user || ""
    }
  }


  getCleanJson(obj: Note, newIDid: any): {} {
    return {
      id: newIDid,
      title: obj.title || "",
      content: obj.content || "",
      user: obj.user || ""
    }
  }


  getUserRef() {
    return collection(this.firestore, 'users');
  }


  getNoteRef() {
    return collection(this.firestore, 'notes');
  }


  checkValidation() {
    if (this.note.title && this.note.user) {
      this.formIncomplete = false;
    } else
      this.formIncomplete = true;

  }


  saveNote() {
    this.loading = true;
    this.addNote(this.setNoteObject(this.note, ''), "notes")
  }




}
