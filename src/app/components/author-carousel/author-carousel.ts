import { Component, computed, inject } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { IAuthor } from '../../types/author';
import { RouterLink } from '@angular/router';
import { Image } from '../image/image';
import { AuthorService } from '../../services/author-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-author-carousel',
  imports: [NzCarouselModule, RouterLink, Image],
  templateUrl: './author-carousel.html',
  styleUrl: './author-carousel.scss',
})
export class AuthorCarousel {
  private authorService = inject(AuthorService);
  private breakpointObserver = inject(BreakpointObserver);

  private authors = toSignal(this.authorService.getAll(), {
    initialValue: [] as IAuthor[],
  });

  private readonly customMediumQuery = '(max-width: 1200px)';

  private itemsPerPage = toSignal(
    this.breakpointObserver
      .observe([
        Breakpoints.Handset,       
        Breakpoints.Tablet,        
        this.customMediumQuery     
      ])
      .pipe(
        map((result) => {
          if (result.breakpoints[Breakpoints.HandsetPortrait] || result.breakpoints[Breakpoints.HandsetLandscape]) {
            return 3;
          }
          if (result.breakpoints[Breakpoints.TabletPortrait] || result.breakpoints[Breakpoints.TabletLandscape]) {
            return 5;
          }
          if (result.breakpoints[this.customMediumQuery]) {
            return 6;
          }
          return 7;
        })
      ),
    { initialValue: 7 }
  );

  groupedItems = computed(() => {
    const size = this.itemsPerPage();
    return this.chunkArray(this.authors(), size);
  });

  currentColumns = computed(() => this.itemsPerPage());

  chunkArray(array: IAuthor[], size: number) {
    if (!array.length) return [];
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
}