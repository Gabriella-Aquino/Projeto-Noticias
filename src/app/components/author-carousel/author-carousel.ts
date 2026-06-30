import { Component, computed, inject } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { IAuthor } from '../../types/author';
import { RouterLink } from '@angular/router';
import { Image } from '../image/image';
import { AuthorService } from '../../services/author-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-author-carousel',
  imports: [NzCarouselModule, RouterLink, Image],
  templateUrl: './author-carousel.html',
  styleUrl: './author-carousel.scss',
})
export class AuthorCarousel {
  // originalList = AUTHORS_MOCK;

  // groupedItems: IAuthor[][] = [];

  private authorService = inject(AuthorService);

  private authors = toSignal(this.authorService.getAll(), {
    initialValue: [] as IAuthor[],
  });

  groupedItems = computed(() => this.chunkArray(this.authors(), 7));

  chunkArray(array: IAuthor[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
}
