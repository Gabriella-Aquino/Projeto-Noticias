import { Component, computed, inject } from '@angular/core';
import { NewsListingPageComponent } from '../../components/news-listing-page-component/news-listing-page-component';
import { ActivatedRoute } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, of } from 'rxjs';
import { CategoryService } from '../../services/category';
import { NewsService } from '../../services/news-service';
import { INews } from '../../types/news';

@Component({
  selector: 'app-category',
  imports: [NewsListingPageComponent],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category {
  private route = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);
  private newsService = inject(NewsService);

  private routeParams = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  categoryId = computed(() => {
    const id = this.routeParams().get('id');
    return id ? Number(id) : null;
  });

  private category = toSignal(
    toObservable(this.categoryId).pipe(
      switchMap((id) => (id ? this.categoryService.getCategoryById(id) : of(null)))
    ),
    { initialValue: null }
  );

  title = computed(() => this.category()?.name ?? 'Categoria');

  news = toSignal(
    toObservable(this.categoryId).pipe(
      switchMap((id) => (id ? this.newsService.getNewsByCategory(id) : of([] as INews[])))
    ),
    { initialValue: [] as INews[] }
  );
}
