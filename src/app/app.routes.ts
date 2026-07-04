import { Routes } from '@angular/router';
import { News } from './pages/news/news';
import { Home } from './pages/home/home';
import { ColumnistDetails } from './pages/columnist-details/columnist-details';
import { Category } from './pages/category/category';
import { Login } from './pages/login/login';
import { AdminLayout } from './pages/admin/admin-layout/admin-layout';
import { AdminCategories } from './pages/admin/admin-categories/admin-categories';
import { AdminAuthors } from './pages/admin/admin-authors/admin-authors';
import { AdminUsers } from './pages/admin/admin-users/admin-users';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'news/:id', component: News },
  { path: 'columnist/:id', component: ColumnistDetails},
  { path: 'category/:id', component: Category},
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
      { path: 'categories', component: AdminCategories },
      { path: 'authors', component: AdminAuthors },
      { path: 'users', component: AdminUsers, canActivate: [adminGuard] },
    ],
  },
];
