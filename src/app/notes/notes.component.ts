import { Component, inject, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
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
export class NotesComponent implements OnInit, OnDestroy {

  firestore: Firestore = inject(Firestore);
  unsubNotes;
  unsubUser;
  listNotes: any = [];
  listUser: any = [];
  note = new Note();
  filteredUserId!: string;
  private intervalFitNotes: any;
  searchInput: string = '';

  //track windowsize:
  @ViewChild('myContainer')
  myContainer!: ElementRef;


  ngOnInit(): void {
    this.intervalFitNotes = setInterval(() => {
      this.ngAfterViewInit();
    }, 3000)

  }


  ngOnDestroy(): void {
    if (this.intervalFitNotes) {
      clearInterval(this.intervalFitNotes);
      //console.log('Interval gestoppt');
    }
    this.unsubNotes();
    this.unsubUser();
  }


  loggingNbModel() {
    //console.log(this.filteredUserId);
    //this.subNotesList();
  }


  get searchInputFunc(): string {
    return this.searchInput;
  }

  set searchInputFunc(value: string) {
    //console.log('Search Input: ', value);
    this.searchInput = value;
    this.setNewHeight();
  }


  setNewHeight() {
    const height = this.myContainer.nativeElement.offsetHeight;
    this.fitNotesOnlyHeight(height);

  }


  fitNotesOnlyHeight(newHeight: any) {
    this.listNotes.forEach((element: any) => {
      const numberOfPixelHeight = +element.transform2.slice(0, -2);

      const random = 50;






      /*  if (numberOfPixelHeight + 240 > newHeight || numberOfPixelHeight < 0) {
         let random: number;
         if (newHeight > 240) {
           random = Math.floor(Math.random() * (newHeight - 240))
         } else {
           random = 0;
         } */
      element.transform2 = random + 'px';
      this.updateNoteTransform2(element);
    })

  }





  ngAfterViewInit() {
    const width = this.myContainer.nativeElement.offsetWidth;
    const height = this.myContainer.nativeElement.offsetHeight;
    //console.log(`Breite: ${width}, Höhe: ${height}`);
    this.fitNotes(width);
  }




  constructor(public dialog: MatDialog) {
    this.unsubNotes = this.subNotesList();
    this.unsubUser = this.subUserList();
  }


  subNotesList() {
    let q = query(this.getNotesRef(), orderBy('title'));
    return onSnapshot(q, (list) => {
      this.listNotes = [];
      list.forEach((element) => {
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



  fitNotes(newWidth: any) {
    this.listNotes.forEach((element: any) => {
      const numberOfPixelWidth = +element.transform1.slice(0, -2);
      const numberOfPixelHeight = +element.transform2.slice(0, -2);

      //console.log(newWidth, numberOfPixel);

      if (numberOfPixelWidth + 240 > newWidth) {
        let random: number;
        if (newWidth > 240) {
          random = Math.floor(Math.random() * (newWidth - 240))
        } else {
          random = 0;
        }
        element.transform1 = random + 'px';
        this.updateNoteTransform1(element);
      }

      /* if (numberOfPixelHeight + 240 > newHeight || numberOfPixelHeight < 0) {
        let random: number;
        if (newHeight > 240) {
          random = Math.floor(Math.random() * (newHeight - 240))
        } else {
          random = 0;
        }
        element.transform2 = random + 'px';
        this.updateNoteTransform2(element);
      }
    }); */
    })
  }


  async updateNoteTransform1(note: any) {
    const docRef = doc(this.getNoteRef(), note.id);
    await updateDoc(docRef, { transform1: note.transform1 }).catch(
      (err) => { console.log(err); }
    ).then(
      () => {
        //console.log("Update")
        //this.loading = false;
      }
    );
  }


  async updateNoteTransform2(note: any) {
    const docRef = doc(this.getNoteRef(), note.id);
    await updateDoc(docRef, { transform2: note.transform2 }).catch(
      (err) => { console.log(err); }
    ).then(
      () => {
        //console.log("Update")
        //this.loading = false;
      }
    );
  }




  searchFunction(note: any) {
    if (note.title.toLowerCase().includes(this.searchInput.toLowerCase())
      || note.content.toLowerCase().includes(this.searchInput.toLowerCase())
      || this.checkNoteAndUser(note)
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkNoteAndUser(note: any) {
    let counter: number = 0;
    this.listUser.forEach((element: any) => {
      if (element.id == note.user
        && element.firstName.toLowerCase().includes(this.searchInput.toLocaleLowerCase())
        || element.lastName.toLowerCase().includes(this.searchInput.toLowerCase())
      ) {
        counter++;
      }
    });

    if (counter > 0) {
      return true;
    } else {
      return false;
    }
  }
}
