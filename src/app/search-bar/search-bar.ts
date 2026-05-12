import { Component, signal } from '@angular/core';
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
  isSearchVisible = signal(false);

  showModalSearch(): void {
    this.isSearchVisible.set(true);
  }

  handleCancel(): void {
    this.isSearchVisible.set(false);
  }
}
