import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { LoginComponent } from './login/login.component';
import { RefreshTablesComponent } from './refresh-tables/refresh-tables.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'RefreshTables', component: RefreshTablesComponent },
  { path: 'Authors', component: AuthorsComponent },
  { path: 'Login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
