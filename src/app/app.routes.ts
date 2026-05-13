import { Routes } from '@angular/router';
import { News } from './pages/news/news';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'news/:id', component: News },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
];
