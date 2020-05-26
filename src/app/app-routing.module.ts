import { AuthGuard } from './shared/guards/auth.guard';
import { AllBooksComponent } from './books/all-books/all-books.component';
import { DetailsComponent } from './books/details/details.component';
import { LayoutComponent } from './layout/layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'books', component: LayoutComponent,  canActivate: [AuthGuard], children: [
        {
            path: '',
            redirectTo: 'all',
            pathMatch: 'full'
        },
        {
          path: 'all',
          component: AllBooksComponent
        },
        {
          path: 'add',
          component: AddBookComponent
        },
        {
          path: 'details/:id',
          component: DetailsComponent
        }
    ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

