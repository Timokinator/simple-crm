import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { query, orderBy, limit, where, Firestore, collection, doc, getDoc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

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
  user = new User;
  dataLoaded: boolean = false;

  constructor(private route: ActivatedRoute) {
    this.routeId = this.route.params;
    this.userID = this.routeId['_value']['id'];

  };

  ngOnInit(): void {
    console.log(this.userID)
    this.loadUser();
  }


  async loadUser() {
    const docRef = doc(this.firestore, "users", this.userID);
    const docSnap = await getDoc(docRef);
    this.writeUser(docSnap);
    //this.setUser(docSnap);
  }


  writeUser(docSnap: DocumentSnapshot<DocumentData, DocumentData>) {
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      this.userData = docSnap.data();
      this.dataLoaded = true;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }













}
