import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditAddressComponent } from './dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { DialogDeleteUserComponent } from './dialog-delete-user/dialog-delete-user.component';
import { MatDividerModule } from '@angular/material/divider';
import { HelpSiteComponent } from './help-site/help-site.component';
import { ImprintSiteComponent } from './imprint-site/imprint-site.component';
import { NotesComponent } from './notes/notes.component';
import { DialogAddNoteComponent } from './dialog-add-note/dialog-add-note.component';
import { MatSelectModule, matSelectAnimations } from '@angular/material/select';
import { DialogEditNoteComponent } from './dialog-edit-note/dialog-edit-note.component';
import { DialogDeleteNoteComponent } from './dialog-delete-note/dialog-delete-note.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ArticlesComponent } from './articles/articles.component';
import { OrdersComponent } from './orders/orders.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DialogAddArticleComponent } from './dialog-add-article/dialog-add-article.component';
import { DialogAddCategoryComponent } from './dialog-add-category/dialog-add-category.component';
import { DialogAddSupplierComponent } from './dialog-add-supplier/dialog-add-supplier.component';
import { DialogEditArticleComponent } from './dialog-edit-article/dialog-edit-article.component';
import { DialogDeleteArticleComponent } from './dialog-delete-article/dialog-delete-article.component';
import { DataManagementComponent } from './data-management/data-management.component';
import { DialogEditCategoryComponent } from './dialog-edit-category/dialog-edit-category.component';
import { DialogDeleteCategoryComponent } from './dialog-delete-category/dialog-delete-category.component';
import { DialogEditSupplierComponent } from './dialog-edit-supplier/dialog-edit-supplier.component';
import { DialogDeleteSupplierComponent } from './dialog-delete-supplier/dialog-delete-supplier.component';
import { CustomersComponent } from './customers/customers.component';
import { DialogAddCustomerComponent } from './dialog-add-customer/dialog-add-customer.component';
import {TextFieldModule} from '@angular/cdk/text-field';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { DialogEditCustomerComponent } from './dialog-edit-customer/dialog-edit-customer.component';
import { DialogDeleteCustomerComponent } from './dialog-delete-customer/dialog-delete-customer.component';
import { DialogAddOrderComponent } from './dialog-add-order/dialog-add-order.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';






@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    DialogAddUserComponent,
    UserDetailComponent,
    DialogEditAddressComponent,
    DialogEditUserComponent,
    DialogDeleteUserComponent,
    HelpSiteComponent,
    ImprintSiteComponent,
    NotesComponent,
    DialogAddNoteComponent,
    DialogEditNoteComponent,
    DialogDeleteNoteComponent,
    ArticlesComponent,
    OrdersComponent,
    DialogAddArticleComponent,
    DialogAddCategoryComponent,
    DialogAddSupplierComponent,
    DialogEditArticleComponent,
    DialogDeleteArticleComponent,
    DataManagementComponent,
    DialogEditCategoryComponent,
    DialogDeleteCategoryComponent,
    DialogEditSupplierComponent,
    DialogDeleteSupplierComponent,
    CustomersComponent,
    DialogAddCustomerComponent,
    CustomerDetailComponent,
    DialogEditCustomerComponent,
    DialogDeleteCustomerComponent,
    DialogAddOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
    MatCardModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDividerModule,
    MatSelectModule,
    DragDropModule,
    MatTableModule,
    MatPaginatorModule,
    TextFieldModule,
    CdkAccordionModule,
    provideFirebaseApp(() => initializeApp({ "projectId": "simple-crm-11490", "appId": "1:114888599173:web:a4921aa755da4c02746bec", "storageBucket": "simple-crm-11490.appspot.com", "apiKey": "AIzaSyAY2aBF17See0jJbzS9P6IapbcKeuWW1xM", "authDomain": "simple-crm-11490.firebaseapp.com", "messagingSenderId": "114888599173" })),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
