import { Component, computed, signal } from '@angular/core';
import { Button } from '../button/button';
import { SearchBar } from '../search-bar/search-bar';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { ILinks, Links } from '../links/links';
import { CATEGORIES_MOCK } from '../mocks/category';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [Button, SearchBar, NzDropdownModule, NzMenuModule, NzIconModule, NzDrawerModule, Links],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  categories = computed<ILinks[]>(() =>
    CATEGORIES_MOCK.map((category) => ({
      label: category.name,
      href: `/category/${category.id}`,
    }))
  );

  visible = signal(false);

  openMenu() {
    this.visible.set(true);
  }

  closeMenu() {
    this.visible.set(false);
  }
}
