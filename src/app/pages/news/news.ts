import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LogoWithRedirect } from '../../logo-with-redirect/logo-with-redirect';
import { NewsService } from '../../services/news-service';
import { AuthorService } from '../../services/author-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { TimeAgoPipe } from '../../pipes/time-ago-pipe';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [DatePipe, LogoWithRedirect, TimeAgoPipe],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News {
  private route = inject(ActivatedRoute);

  private newsService = inject(NewsService);
  private authorService = inject(AuthorService);

  imageLoaded = signal(false);

  private routeParams = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  newsId = computed(() => {
    const id = this.routeParams().get('id');
    return id ? Number(id) : null;
  });

  newsData = toSignal(
    toObservable(this.newsId).pipe(
      switchMap((id) => (id ? this.newsService.getNewById(id) : of(null))),
    ),
    { initialValue: null },
  );

  authorData = toSignal(
    toObservable(computed(() => this.newsData()?.author ?? null)).pipe(
      switchMap((authorId) => (authorId ? this.authorService.getAuthorById(authorId) : of(null))),
    ),
    { initialValue: null },
  );

  updatedAtDate = computed(() => {
    const date = this.newsData()?.updated;
    return date ? new Date(date) : null;
  });


  constructor() {
    effect(() => {
      this.newsData()?.image;
      this.imageLoaded.set(false);
    });
  }

  onImageLoad() {
    this.imageLoaded.set(true);
  }
}
