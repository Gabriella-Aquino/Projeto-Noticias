import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NewsCard } from "./components/news-card/news-card";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzLayoutModule, NzImageModule, NewsCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('projeto-noticias');
}
