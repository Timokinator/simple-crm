import { Component } from '@angular/core';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {

  user!: User;
  loading: boolean = false;
  formIncomplete: boolean = false;
  birthDate!: Date;








  checkValidation() {
    if (this.user.firstName && this.user.lastName && this.user.birthDate && this.user.email) {
      this.formIncomplete = false;
    } else
      this.formIncomplete = true;

  }


  onNoClick() {

  }


  saveUser() {

  }






  

}
