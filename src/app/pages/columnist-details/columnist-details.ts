import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NewsListingPageComponent } from '../../components/news-listing-page-component/news-listing-page-component';
import { newsMock } from '../../mocks/news';
import { AuthorService } from '../../services/author-service';
import { of, switchMap } from 'rxjs';

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

  news = computed(() => {
    const id = this.columnistId();
    if (!id) return [];
    return newsMock.filter((item) => item.author === id);
  });
}
