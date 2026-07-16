import { Component, computed, inject } from '@angular/core';
import { NewsListingPageComponent } from '../../components/news-listing-page-component/news-listing-page-component';
import { ActivatedRoute } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, of } from 'rxjs';
import { NewsService } from '../../services/news-service';
import { INews } from '../../types/news';

@Component({
  selector: 'app-search',
  imports: [NewsListingPageComponent],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  private route = inject(ActivatedRoute);
  private newsService = inject(NewsService);

  private queryParams = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  query = computed(() => this.queryParams().get('q') ?? '');

  title = computed(() => `Resultados para "${this.query()}"`);

  news = toSignal(
    toObservable(this.query).pipe(
      switchMap((query) => (query ? this.newsService.search(query) : of([] as INews[])))
    ),
    { initialValue: [] as INews[] }
  );
}
