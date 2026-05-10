import { Component, input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-news-card',
  imports: [NzCardModule, NzImageModule],
  templateUrl: './news-card.html',
  styleUrl: './news-card.scss',
})
export class NewsCard {
  title = input.required<string>();
  subtitle = input<string>();
  category = input<string>();
  image = input<string>();
  main = input<boolean>(false)
}
