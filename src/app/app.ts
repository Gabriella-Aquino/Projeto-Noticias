import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';
import { NavBar } from './nav-bar/nav-bar';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NewsCard } from './components/news-card/news-card';
import { newsMock } from './mocks/news';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, NavBar, NzLayoutModule, NewsCard],
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
