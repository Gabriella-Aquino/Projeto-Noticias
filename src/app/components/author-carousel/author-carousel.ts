import { Component } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { AUTHORS_MOCK } from '../../mocks/author';
import { IAuthor } from '../../types/author';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-author-carousel',
  imports: [NzCarouselModule, RouterLink],
  templateUrl: './author-carousel.html',
  styleUrl: './author-carousel.scss',
})
export class AuthorCarousel {
  originalList = AUTHORS_MOCK;

  groupedItems: IAuthor[][] = [];

  constructor() {
    this.groupedItems = this.chunkArray(this.originalList, 7);
  }

  chunkArray(array: IAuthor[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
}
