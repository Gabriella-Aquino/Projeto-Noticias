import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NzInputModule, NzIconModule, NzButtonModule, NzModalModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  private router = inject(Router);

  isSearchVisible = signal(false);

  showModalSearch(): void {
    this.isSearchVisible.set(true);
  }

  handleCancel(): void {
    this.isSearchVisible.set(false);
  }

  search(term: string): void {
    const query = term.trim();
    if (!query) {
      return;
    }

    this.isSearchVisible.set(false);
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }
}
