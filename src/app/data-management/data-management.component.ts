import { Component, Inject, inject } from '@angular/core';
import { Category } from 'src/models/category.class';
import { Supplier } from 'src/models/supplier.class';
import { query, orderBy, limit, where, Firestore, collection, doc, getDoc, onSnapshot, addDoc, updateDoc, deleteDoc, setDoc, DocumentData, DocumentSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddCategoryComponent } from '../dialog-add-category/dialog-add-category.component';
import { DialogAddSupplierComponent } from '../dialog-add-supplier/dialog-add-supplier.component';
import { DialogEditCategoryComponent } from '../dialog-edit-category/dialog-edit-category.component';
import { DialogDeleteCategoryComponent } from '../dialog-delete-category/dialog-delete-category.component';
import { DialogEditSupplierComponent } from '../dialog-edit-supplier/dialog-edit-supplier.component';
import { DialogDeleteSupplierComponent } from '../dialog-delete-supplier/dialog-delete-supplier.component';


@Component({
  selector: 'app-data-management',
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.scss']
})
export class DataManagementComponent {

  firestore: Firestore = inject(Firestore);

  category = new Category();
  unsubCategory: any;
  listCategories: any = [];

  unsubSupplier: any;
  supplier = new Supplier();
  listSupplier: any = [];

  newCategory!: string;
  newSupplier!: string;

  loading!: boolean;

  searchInput: string = '';

  constructor(public dialog: MatDialog) {
    this.unsubCategory = this.subCategoryList();
    this.unsubSupplier = this.subSupplierList();
  }



  //Code für Category

  subCategoryList() {
    const q = query(this.getCategoryRef(), orderBy('name'));
    return onSnapshot(q, (list) => {
      this.listCategories = [];
      list.forEach(element => {
        this.listCategories.push(this.setCategoryObject(element.data(), element.id));
      });
    });
  }


  getCategoryRef() {
    return collection(this.firestore, 'categories');
  }

  setCategoryObject(obj: any, id: string,): Category {
    return {
      id: id || "",
      name: obj.name || ""

    }
  }


  saveCategory() {
    this.loading = true;
    this.addCategory(this.setCategory(this.category, ''), 'categories')
  }


  async addCategory(item: Category, colId: "categories") {
    if (colId == "categories") {
      await addDoc(this.getCategoryRef(), item).catch(
        (err) => { console.error(err) }
      ).then(
        (docRef) => {
          this.loading = false;
          this.newCategory = '';
          const newID = docRef?.id;
          this.updateCategoryWithId(item, newID);
        }
      )
    }
  }


  async updateCategoryWithId(item: Category, id: any) {
    const docRef = doc(this.getCategoryRef(), id);
    await updateDoc(docRef, this.getCleanJsonCategory(item, id)).catch(
      (err) => { console.log(err); }
    ).then(
      //() => { console.log("Update") }
    );

  }


  getCleanJsonCategory(obj: Category, newIDid: any): {} {
    return {
      id: newIDid,
      name: obj.name || "",
    }
  }


  setCategory(obj: any, id: string,): Category {
    return {
      id: id || "",
      name: this.newCategory || "",
    }
  }


  openDialogEditCategory(category: any) {
    const dialog = this.dialog.open(DialogEditCategoryComponent);
    dialog.componentInstance.category = new Category(category);
  }

  openDialogDeleteCategory(category: any) {
    const dialog = this.dialog.open(DialogDeleteCategoryComponent);
    dialog.componentInstance.category = new Category(category);

  }






  //Code für Supplier

  subSupplierList() {
    const q = query(this.getSupplierRef(), orderBy('name'));
    return onSnapshot(q, (list) => {
      this.listSupplier = [];
      list.forEach(element => {
        this.listSupplier.push(this.setSupplierObject(element.data(), element.id));
      });
    });
  }


  getSupplierRef() {
    return collection(this.firestore, 'supplier');
  }





  saveSupplier() {
    this.loading = true;
    this.addSupplier(this.setSupplier(this.supplier, ''), 'supplier')
  }


  async addSupplier(item: Supplier, colId: "supplier") {
    if (colId == "supplier") {
      await addDoc(this.getSupplierRef(), item).catch(
        (err) => { console.error(err) }
      ).then(
        (docRef) => {
          this.loading = false;
          this.newSupplier = '';
          const newID = docRef?.id;
          this.updateSupplierWithId(item, newID);
        }
      )
    }
  }


  async updateSupplierWithId(item: Supplier, id: any) {
    const docRef = doc(this.getSupplierRef(), id);
    await updateDoc(docRef, this.getCleanJsonSupplier(item, id)).catch(
      (err) => { console.log(err); }
    ).then(
      //() => { console.log("Update") }
    );
  }


  getCleanJsonSupplier(obj: Supplier, newIDid: any): {} {
    return {
      id: newIDid,
      name: obj.name || "",
    }
  }


  setSupplier(obj: any, id: string,): Supplier {
    return {
      id: id || "",
      name: this.newSupplier || "",
    }
  }

  setSupplierObject(obj: any, id: string,): Supplier {
    return {
      id: id || "",
      name: obj.name || "",
    }
  }


  openDialogEditSupplier(supplier: any) {
    const dialog = this.dialog.open(DialogEditSupplierComponent);
    dialog.componentInstance.supplier = new Category(supplier);
  }

  openDialogDeleteSupplier(supplier: any) {
    const dialog = this.dialog.open(DialogDeleteSupplierComponent);
    dialog.componentInstance.supplier = new Category(supplier);
  }




  // Search function

  searchFunction(obj: any) {
    if (obj.name.toLowerCase().includes(this.searchInput.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  }


  ngonDestroy() {
    this.unsubCategory();
    this.unsubSupplier();
  }


}
