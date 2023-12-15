import { Component, inject } from '@angular/core';
import { Category } from 'src/models/category.class';
import { query, orderBy, limit, where, Firestore, collection, doc, getDoc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';



@Component({
  selector: 'app-dialog-add-category',
  templateUrl: './dialog-add-category.component.html',
  styleUrls: ['./dialog-add-category.component.scss']
})
export class DialogAddCategoryComponent {

  firestore: Firestore = inject(Firestore);


  category = new Category();
  loading!: boolean;
  formIncomplete: boolean = true;




  checkValidation() {
    if (this.category.name) {
      this.formIncomplete = false;
    } else
      this.formIncomplete = true;
  }



  saveCategory() {
    this.loading = true;
    //console.log(this.category)
    this.addCategory(this.setCategory(this.category, ''), 'categories')
  }


  async addCategory(item: Category, colId: "categories") {
    if (colId == "categories") {
      await addDoc(this.getCategoryRef(), item).catch(
        (err) => { console.error(err) }
      ).then(
        (docRef) => {
          this.loading = false;
          const newID = docRef?.id;
          this.updateCategoryWithId(item, newID);
        }
      )
    }
  }


  async updateCategoryWithId(item: Category, id: any) {
    const docRef = doc(this.getCategoryRef(), id);
    await updateDoc(docRef, this.getCleanJson(item, id)).catch(
      (err) => { console.log(err); }
    ).then(
      //() => { console.log("Update") }
    );

  }


  getCategoryRef() {
    return collection(this.firestore, 'categories');
  }


  getCleanJson(obj: Category, newIDid: any): {} {
    return {
      id: newIDid,
      name: obj.name || "",
    }
  }


  setCategory(obj: any, id: string,): Category {
    return {
      id: id || "",
      name: obj.name || "",
    }
  }


}
