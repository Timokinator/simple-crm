import { Component, OnInit, OnDestroy, inject, HostListener } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from 'src/models/user.class';
import { query, orderBy, limit, where, Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc } from '@angular/fire/firestore';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnDestroy {
  firestore: Firestore = inject(Firestore);
  user = new User();
  unsubUser;
  listUser: any = [];
  searchInput: string = '';


  constructor(public dialog: MatDialog) {
    this.unsubUser = this.subUserList();
  }


  


  subUserList() {
    const q = query(this.getUserRef()
      //, where("firstName", "==", "Timo")
      , limit(100), orderBy('lastName'));
    return onSnapshot(q, (list) => {
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

  ngOnDestroy() {
    this.unsubUser();
  }


  openDialog() {
    this.dialog.open(DialogAddUserComponent);

  }



  searchFunction(user: any) {
    if (user.firstName.toLowerCase().includes(this.searchInput.toLowerCase())
      || user.lastName.toLowerCase().includes(this.searchInput.toLowerCase())
      || user.email.toLowerCase().includes(this.searchInput.toLowerCase())
      || user.email.toLowerCase().includes(this.searchInput.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  }




}
