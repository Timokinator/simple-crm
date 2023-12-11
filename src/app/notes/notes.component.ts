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
    const q = query(this.getNotesRef(), orderBy('title') )
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
      user: obj.user || ""
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





}
