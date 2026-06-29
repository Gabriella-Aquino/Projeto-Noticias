import { Component, computed, input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';
import { RouterLink } from '@angular/router';

export type INewsCardVariant = 'primary' | 'secondary' | 'tertiary';

@Component({
  selector: 'app-news-card',
  imports: [NzCardModule, NzImageModule, TimeAgoPipe, RouterLink],
  templateUrl: './news-card.html',
  styleUrl: './news-card.scss',
})
export class NewsCard {
  id = input.required<number>();
  title = input.required<string>();
  subtitle = input.required<string>();
  category = input.required<number>();
  image = input.required<string>();
  updated = input.required<Date | null>();
  created = input.required<Date>();

  variant = input<INewsCardVariant>('secondary');
}
