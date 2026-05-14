import { Component, computed, inject } from '@angular/core';
import { NewsListingPageComponent } from '../../components/news-listing-page-component/news-listing-page-component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { newsMock } from '../../mocks/news';
import { CATEGORIES_MOCK } from '../../mocks/category';

@Component({
  selector: 'app-category',
  imports: [NewsListingPageComponent],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category {
  private route = inject(ActivatedRoute);
  private routeParams = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  categoryId = computed(() => {
    const id = this.routeParams().get('id');
    return id ? Number(id) : null;
  });

  title = computed(() => {
    const category = CATEGORIES_MOCK.find(
      (item) => item.id === this.categoryId()
    );
    return category?.name ?? 'Categoria';
  });

  news = computed(() => {
    const id = this.categoryId();
    if (!id) return [];
    return newsMock.filter((item) => item.category === id);
  });
}
