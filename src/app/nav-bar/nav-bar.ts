import { Component, input, signal } from '@angular/core';
import { Button } from '../button/button';
import { SearchBar } from '../search-bar/search-bar';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { ILinks, Links } from '../links/links';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [Button, SearchBar, NzDropdownModule, NzMenuModule, NzIconModule, NzDrawerModule, Links],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  categories = input<ILinks[]>([
    { label: 'Política', href: '#' },
    { label: 'Esportes', href: '#' },
    { label: 'Entretenimento', href: '#' },
    { label: 'Ciência', href: '#' },
    { label: 'Colunas', href: '#' },
  ])

  visible = signal(false);

  openMenu() {
    this.visible.set(true);
  }

  closeMenu() {
    this.visible.set(false);
  }
}
