import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { HelpSiteComponent } from './help-site/help-site.component';
import { ImprintSiteComponent } from './imprint-site/imprint-site.component';
import { NotesComponent } from './notes/notes.component';
import { ArticlesComponent } from './articles/articles.component';
import { OrdersComponent } from './orders/orders.component';
import { DataManagementComponent } from './data-management/data-management.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "", component: DashboardComponent },
  { path: "user", component: UserComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "user/:id", component: UserDetailComponent },
  { path: "help", component: HelpSiteComponent },
  { path: "imprint", component: ImprintSiteComponent },
  { path: "notes", component: NotesComponent },
  { path: "articles", component: ArticlesComponent },
  { path: "orders", component: OrdersComponent },
  { path: "datamanagement", component: DataManagementComponent },
  { path: "customers", component: CustomersComponent },
  { path: "customers/:id", component: CustomerDetailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
