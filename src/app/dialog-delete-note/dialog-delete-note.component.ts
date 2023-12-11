import { Component, OnInit, inject } from '@angular/core';
import { Note } from 'src/models/note.class';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-dialog-delete-note',
  templateUrl: './dialog-delete-note.component.html',
  styleUrls: ['./dialog-delete-note.component.scss']
})
export class DialogDeleteNoteComponent {

  readyToDelete!: string;
  firestore: Firestore = inject(Firestore);
  note!: Note;
  routeId: any;


  constructor(private route: ActivatedRoute, private router: Router) {

  }




  async deleteNote() {
    await deleteDoc(doc(this.getNoteRef(), this.note.id));
  }


  getNoteRef() {
    return collection(this.firestore, 'notes');
  }


}
