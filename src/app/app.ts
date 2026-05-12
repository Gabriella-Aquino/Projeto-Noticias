import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';
import { NavBar } from './nav-bar/nav-bar';
import { WeatherCard } from './weather-card/weather-card';
import { QuotationCard } from './quotation-card/quotation-card';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NewsCard } from './components/news-card/news-card';
import { newsMock } from './mocks/news';
import { AuthorCarousel } from "./components/author-carousel/author-carousel";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, NavBar, WeatherCard, QuotationCard, NzLayoutModule, NewsCard, AuthorCarousel],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('projeto-noticias');

  news = newsMock;

  mainNews = this.news.find((news) => news.main);

  secondeNews = this.news.filter((news) => !news.main).slice(0, 3);

  tertiaryNews = this.news.filter((news) => !news.main).slice(3, 8);

  otherNews = this.news.filter((news) => !news.main).slice(8);
}
