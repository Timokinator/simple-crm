import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddNoteComponent } from '../dialog-add-note/dialog-add-note.component';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Note } from 'src/models/note.class';
import { User } from 'src/models/user.class';
import { DialogEditNoteComponent } from '../dialog-edit-note/dialog-edit-note.component';
import { DialogDeleteNoteComponent } from '../dialog-delete-note/dialog-delete-note.component';




@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

  firestore: Firestore = inject(Firestore);
  unsubNotes: any;
  unsubUser: any;
  listNotes: any = [];
  listUser: any = [];
  note = new Note();


  constructor(public dialog: MatDialog) {
    this.unsubNotes = this.subNotesList();
    this.unsubUser = this.subUserList();
  }


  subNotesList() {
    const q = query(this.getNotesRef(), orderBy('title'))
    return onSnapshot(q, (list) => {
      this.listNotes = [];
      list.forEach(element => {
        this.listNotes.push(this.setNotesObject(element.data(), element.id));
      });
    });
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


  setNotesObject(obj: any, id: string,): Note {
    return {
      id: id || "",
      title: obj.title || "",
      content: obj.content || "",
      user: obj.user || "",
      transform1: obj.transform1 || "",
      transform2: obj.transform2 || ""
    }
  }


  getNotesRef() {
    return collection(this.firestore, 'notes');
  }


  getUserRef() {
    return collection(this.firestore, 'users');
  }


  openDialog() {
    this.dialog.open(DialogAddNoteComponent);

  }


  ngonDestroy() {
    this.unsubUser();
    this.unsubNotes();

  }


  editNote(note: any) {
    const dialog = this.dialog.open(DialogEditNoteComponent);
    dialog.componentInstance.note = new Note(note);
  }


  deleteNote(note: any) {
    const dialog = this.dialog.open(DialogDeleteNoteComponent);
    dialog.componentInstance.note = new Note(note);
  }


  endChangePosition(event: any, note: Note) {
    //console.log("end");
    const element = event.source.getRootElement();
    const style = window.getComputedStyle(element);
    const matrix = new WebKitCSSMatrix(style.transform);
    //console.log('1.', matrix.m41, '1.', matrix.m42, '1.', matrix.m43);
    note.transform1 = matrix.m41 + "px";
    note.transform2 = matrix.m42 + "px";
    this.updateNote(note);
  }


  // on resize muss t1 + t2 dynamisch mit foreach maximal festgelegt werden





  async updateNote(note: any) {
    const docRef = doc(this.getNoteRef(), note.id);
    await updateDoc(docRef, this.getCleanJson(note)).catch(
      (err) => { console.log(err); }
    ).then(
      () => {
        //console.log("Update")
        //this.loading = false;
      }
    );
  }


  getNoteRef() {
    return collection(this.firestore, 'notes');
  }


  getCleanJson(obj: Note): {} {
    return {
      id: obj.id,
      title: obj.title || "",
      content: obj.content || "",
      user: obj.user || "",
      transform1: obj.transform1 || "",
      transform2: obj.transform2 || ""
    }
  }



}
