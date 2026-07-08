import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NewsService } from '../../../services/news-service';
import { CategoryService } from '../../../services/category';
import { AuthorService } from '../../../services/author-service';
import { StorageService } from '../../../services/storage-service';
import { INews } from '../../../types/news';
import { ICategory } from '../../../types/category';
import { IAuthor } from '../../../types/author';

@Component({
  selector: 'app-admin-news',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzCheckboxModule,
    NzRadioModule,
    NzPopconfirmModule,
  ],
  templateUrl: './admin-news.html',
  styleUrl: './admin-news.scss',
})
export class AdminNews {
  private newsService = inject(NewsService);
  private categoryService = inject(CategoryService);
  private authorService = inject(AuthorService);
  private storageService = inject(StorageService);
  private message = inject(NzMessageService);
  private fb = inject(FormBuilder);

  news = signal<INews[]>([]);
  categories = signal<ICategory[]>([]);
  authors = signal<IAuthor[]>([]);
  loading = signal(false);
  isModalVisible = signal(false);
  editingNews = signal<INews | null>(null);
  imageSource = signal<'url' | 'file'>('url');
  uploadingImage = signal(false);

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    subTitle: ['', [Validators.required, Validators.minLength(2)]],
    content: ['', [Validators.required, Validators.minLength(10)]],
    image: ['', [Validators.required]],
    category: this.fb.control<number | null>(null, [Validators.required]),
    author: this.fb.control<number | null>(null, [Validators.required]),
    main: [false],
  });

  constructor() {
    this.load();
    this.categoryService.getAll().subscribe((categories) => this.categories.set(categories));
    this.authorService.getAll().subscribe((authors) => this.authors.set(authors));
  }

  load(): void {
    this.loading.set(true);
    this.newsService.getAll().subscribe({
      next: (news) => {
        this.news.set(news);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Não foi possível carregar as notícias.');
        this.loading.set(false);
      },
    });
  }

  authorName(id: number): string {
    return this.authors().find((author) => author.id === id)?.name ?? '';
  }

  categoryName(id: number): string {
    return this.categories().find((category) => category.id === id)?.name ?? '';
  }

  openCreateModal(): void {
    this.editingNews.set(null);
    this.imageSource.set('url');
    this.uploadingImage.set(false);
    this.form.reset({
      title: '',
      subTitle: '',
      content: '',
      image: '',
      category: null,
      author: null,
      main: false,
    });
    this.isModalVisible.set(true);
  }

  openEditModal(item: INews): void {
    this.editingNews.set(item);
    this.imageSource.set('url');
    this.uploadingImage.set(false);
    this.form.reset({
      title: item.title,
      subTitle: item.subTitle,
      content: item.content,
      image: item.image,
      category: item.category,
      author: item.author,
      main: item.main ?? false,
    });
    this.isModalVisible.set(true);
  }

  closeModal(): void {
    this.isModalVisible.set(false);
  }

  onImageFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    this.uploadingImage.set(true);
    this.storageService.uploadImage(file, 'News').subscribe({
      next: (url) => {
        this.form.controls.image.setValue(url);
        this.uploadingImage.set(false);
      },
      error: () => {
        this.message.error('Não foi possível enviar a imagem.');
        this.uploadingImage.set(false);
      },
    });
  }

  submit(): void {
    if (this.uploadingImage()) {
      this.message.warning('Aguarde o envio da imagem terminar.');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, subTitle, content, image, category, author, main } = this.form.getRawValue();
    const payload = {
      title,
      subTitle,
      content,
      cover: image,
      category_id: category!,
      author_id: author!,
      main,
    };
    const editing = this.editingNews();

    const request = editing ? this.newsService.update(editing.id, payload) : this.newsService.create(payload);

    request.subscribe({
      next: () => {
        this.message.success(editing ? 'Notícia atualizada com sucesso.' : 'Notícia criada com sucesso.');
        this.isModalVisible.set(false);
        this.load();
      },
      error: () => {
        this.message.error('Não foi possível salvar a notícia.');
      },
    });
  }

  remove(item: INews): void {
    this.newsService.delete(item.id).subscribe({
      next: () => {
        this.message.success('Notícia excluída com sucesso.');
        this.load();
      },
      error: () => {
        this.message.error('Não foi possível excluir a notícia.');
      },
    });
  }
}
