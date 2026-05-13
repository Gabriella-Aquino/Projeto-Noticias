import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { NewsListingPageComponent } from '../../components/news-listing-page-component/news-listing-page-component';
import { AUTHORS_MOCK } from '../../mocks/author';
import { newsMock } from '../../mocks/news';

@Component({
  selector: 'app-columnist-details',
  imports: [NewsListingPageComponent],
  templateUrl: './columnist-details.html',
  styleUrl: './columnist-details.scss',
})
export class ColumnistDetails {
  private route = inject(ActivatedRoute);
  private routeParams = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  columnistId = computed(() => {
    const id = this.routeParams().get('id');
    return id ? Number(id) : null;
  });

  title = computed(() => {
    const columnist = AUTHORS_MOCK.find(
      (author) => author.id === this.columnistId()
    );
    return columnist?.name ?? 'Colunista';
  });

  news = computed(() => {
    const id = this.columnistId();
    if (!id) return [];
    return newsMock.filter((item) => item.author === id);
  });
}
