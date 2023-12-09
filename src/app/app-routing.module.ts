import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { HelpSiteComponent } from './help-site/help-site.component';
import { ImprintSiteComponent } from './imprint-site/imprint-site.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "user", component: UserComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "user/:id", component: UserDetailComponent },
  { path: "help", component: HelpSiteComponent },
  { path: "imprint", component: ImprintSiteComponent },
  { path: "notes", component: NotesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
