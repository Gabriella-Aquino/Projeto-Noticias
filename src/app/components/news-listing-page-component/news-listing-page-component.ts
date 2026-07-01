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
  headerImage = input('assets/icons/logo-black.svg');


  columnistImageLoaded = signal(false);

  constructor() {
    effect(() => {
      this.headerImage();
      this.columnistImageLoaded.set(false);
    });
  }

  onColumnistImageLoad() {
    this.columnistImageLoaded.set(true);
  }

}
