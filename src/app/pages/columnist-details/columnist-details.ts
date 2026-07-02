import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NewsListingPageComponent } from '../../components/news-listing-page-component/news-listing-page-component';
import { AuthorService } from '../../services/author-service';
import { NewsService } from '../../services/news-service';
import { of, switchMap } from 'rxjs';
import { INews } from '../../types/news';

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

  private authorService = inject(AuthorService);
  private newsService = inject(NewsService);

  columnistId = computed(() => {
    const id = this.routeParams().get('id');
    return id ? Number(id) : null;
  });

  private author = toSignal(
    toObservable(this.columnistId).pipe(
      switchMap((id) => (id ? this.authorService.getAuthorById(id) : of(null))),
    ),
    { initialValue: null },
  );

  title = computed(() => {
    return this.author()?.name ?? 'Colunista';
  });

  avatar = computed(() => {
    return this.author()?.avatar ?? 'assets/icons/avatar-default.png';
  });

  news = toSignal(
    toObservable(this.columnistId).pipe(
      switchMap((id) => (id ? this.newsService.getNewsByAuthor(id) : of([] as INews[]))),
    ),
    { initialValue: [] as INews[] },
  );
}
