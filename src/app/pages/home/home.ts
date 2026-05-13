import { Component } from '@angular/core';
import { WeatherCard } from '../../weather-card/weather-card';
import { QuotationCard } from '../../quotation-card/quotation-card';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NewsCard } from '../../components/news-card/news-card';
import { AuthorCarousel } from '../../components/author-carousel/author-carousel';
import { newsMock } from '../../mocks/news';

@Component({
  selector: 'app-home',
  imports: [ WeatherCard, QuotationCard, NzLayoutModule, NewsCard, AuthorCarousel],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  news = newsMock;

  mainNews = this.news.find((news) => news.main);

  secondeNews = this.news.filter((news) => !news.main).slice(0, 3);

  tertiaryNews = this.news.filter((news) => !news.main).slice(3, 8);

  otherNews = this.news.filter((news) => !news.main).slice(8);
}
