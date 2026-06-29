import { Component, computed, effect, input, signal } from '@angular/core';
import { INews } from '../../types/news';
import { NgClass } from '@angular/common';
import { AUTHORS_MOCK } from '../../mocks/author';
import { LogoWithRedirect } from '../../logo-with-redirect/logo-with-redirect';
import { NewsCard } from '../news-card/news-card';

@Component({
  selector: 'app-news-listing-page-component',
  imports: [LogoWithRedirect, NewsCard],
  templateUrl: './news-listing-page-component.html',
  styleUrl: './news-listing-page-component.scss',
})
export class NewsListingPageComponent {
  page = input.required<'columnist' | 'category'>();
  title = input.required<string>();
  news = input.required<INews[]>();
  columnistId = input<number | null>(null);

  imageToRender = computed(() => {
    if (this.page() !== 'columnist') {
      return 'assets/icons/logo-black.svg';
    }

    const columnist = AUTHORS_MOCK.find((author) => author.id === this.columnistId());

    return columnist?.avatar ?? 'assets/icons/avatar-default.png';
  });

  columnistImageLoaded = signal(false);

  constructor() {
    effect(() => {
      this.imageToRender();
      this.columnistImageLoaded.set(false);
    });
  }

  onColumnistImageLoad() {
    this.columnistImageLoaded.set(true);
  }

}
