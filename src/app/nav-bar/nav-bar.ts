import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../button/button';
import { SearchBar } from '../search-bar/search-bar';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ILinks, Links } from '../links/links';
import { CategoryService } from '../services/category';
import { AuthService } from '../services/auth-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    Button,
    SearchBar,
    NzDropdownModule,
    NzMenuModule,
    NzIconModule,
    NzDrawerModule,
    NzTagModule,
    Links,
  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  private categoryService = inject(CategoryService);
  private authService = inject(AuthService);
  private router = inject(Router);

  categories = toSignal(
    this.categoryService.getAll(),
    { initialValue: [] }
  );

  categoryLinks = computed<ILinks[]>(() =>
    this.categories().map(category => ({
      label: category.name,
      href: `/category/${category.id}`,
    }))
  );

  currentUser = this.authService.currentUser;
  isLoggedIn = this.authService.isLoggedIn;

  roleLabel = computed(() => (this.currentUser()?.role === 'admin' ? 'Admin' : 'Editor'));

  visible = signal(false);

  openMenu() {
    this.visible.set(true);
  }

  closeMenu() {
    this.visible.set(false);
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  goToAdmin() {
    this.router.navigateByUrl('/admin');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
