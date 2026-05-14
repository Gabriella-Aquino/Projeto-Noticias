import { Routes } from '@angular/router';
import { News } from './pages/news/news';
import { Home } from './pages/home/home';
import { ColumnistDetails } from './pages/columnist-details/columnist-details';
import { Category } from './pages/category/category';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'news/:id', component: News },
  { path: 'columnist/:id', component: ColumnistDetails},
  { path: 'category/:id', component: Category},
  { path: 'home', redirectTo: '', pathMatch: 'full' },
];
