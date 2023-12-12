import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { query, orderBy, limit, where, Firestore, collection, doc, getDoc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';
import { NotesComponent } from '../notes/notes.component';
import { Note } from 'src/models/note.class';
import { DialogEditNoteComponent } from '../dialog-edit-note/dialog-edit-note.component';
import { DialogDeleteNoteComponent } from '../dialog-delete-note/dialog-delete-note.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  activatedRoute = inject(ActivatedRoute);
  routeId: any;
  userID: any;
  userData: any;
  user: User = new User();
  dataLoaded: boolean = false;
  birthDayShow: string | undefined;
  unsubUser;
  unsubNotes;
  listNotes: any = [];
  note: Note = new Note();

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.routeId = this.route.params;
    this.userID = this.routeId['_value']['id'];
    this.unsubUser = onSnapshot(doc(this.firestore, 'users', this.userID), (doc) => {
      this.loadUser();
    });
    this.unsubNotes = this.subNotesList();

  };


  subNotesList() {
    const q = query(this.getNotesRef(), where("user", "==", this.userID))
    return onSnapshot(q, (list) => {
      this.listNotes = [];
      list.forEach(element => {
        this.listNotes.push(this.setNotesObject(element.data(), element.id));
      });
    });
  }


  getNotesRef() {
    return collection(this.firestore, 'notes');
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



  ngOnInit(): void {
    //console.log(this.userID)
  }


  convertBirthdayDate() {
    const date = new Date(this.user.birthDate)
    this.birthDayShow = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
  }



  async loadUser() {
    const docRef = doc(this.firestore, "users", this.userID);
    const docSnap = await getDoc(docRef);
    this.writeUser(docSnap);
    //this.setUser(docSnap);
  }


  writeUser(docSnap: DocumentSnapshot<DocumentData, DocumentData>) {
    if (docSnap.exists()) {
      this.user = new User(docSnap.data());
      //console.log(this.user);
      this.convertBirthdayDate();
      this.dataLoaded = true;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }





  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user);
  }


  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user);
  }


  deleteUser() {
    const dialog = this.dialog.open(DialogDeleteUserComponent);
    dialog.componentInstance.user = new User(this.user);
  }



  getUserRef() {
    return collection(this.firestore, 'users');
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
