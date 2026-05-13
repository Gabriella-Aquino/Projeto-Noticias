import { Component, computed, input } from '@angular/core';
import { INews } from '../../types/news';
import { NgClass } from '@angular/common';
import { AUTHORS_MOCK } from '../../mocks/author';
import { LogoWithRedirect } from '../../logo-with-redirect/logo-with-redirect';

@Component({
  selector: 'app-news-listing-page-component',
  imports: [NgClass, LogoWithRedirect],
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
      return
    }

    const columnist = AUTHORS_MOCK.find(
      (author) => author.id === this.columnistId()
    );

    return columnist?.avatar ?? 'assets/icons/logo-black.svg';
  });


}
