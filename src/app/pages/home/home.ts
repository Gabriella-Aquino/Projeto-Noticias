import { Component, computed, inject } from '@angular/core';
import { WeatherCard } from '../../weather-card/weather-card';
import { QuotationCard } from '../../quotation-card/quotation-card';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NewsCard } from '../../components/news-card/news-card';
import { AuthorCarousel } from '../../components/author-carousel/author-carousel';
import { LogoWithRedirect } from '../../logo-with-redirect/logo-with-redirect';
import { NewsService } from '../../services/news-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { INews } from '../../types/news';

@Component({
  selector: 'app-home',
  imports: [WeatherCard, QuotationCard, NzLayoutModule, NewsCard, AuthorCarousel, LogoWithRedirect],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private newsService = inject(NewsService);

  news = toSignal(this.newsService.getAll(), {
    initialValue: [] as INews[],
  });

  mainNews = this.news()[0] ?? null;

  secondNews = computed(() => this.news().slice(1, 4));

  tertiaryNews = computed(() => this.news().slice(4, 9));

  otherNews = computed(() => this.news().slice(9));
}
