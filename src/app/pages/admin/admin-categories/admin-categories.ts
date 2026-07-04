import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CategoryService } from '../../../services/category';
import { ICategory } from '../../../types/category';

@Component({
  selector: 'app-admin-categories',
  imports: [
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzPopconfirmModule,
  ],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.scss',
})
export class AdminCategories {
  private categoryService = inject(CategoryService);
  private message = inject(NzMessageService);
  private fb = inject(FormBuilder);

  categories = signal<ICategory[]>([]);
  loading = signal(false);
  isModalVisible = signal(false);
  editingCategory = signal<ICategory | null>(null);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories.set(categories);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Não foi possível carregar as categorias.');
        this.loading.set(false);
      },
    });
  }

  openCreateModal(): void {
    this.editingCategory.set(null);
    this.form.reset({ name: '' });
    this.isModalVisible.set(true);
  }

  openEditModal(category: ICategory): void {
    this.editingCategory.set(category);
    this.form.reset({ name: category.name });
    this.isModalVisible.set(true);
  }

  closeModal(): void {
    this.isModalVisible.set(false);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name } = this.form.getRawValue();
    const editing = this.editingCategory();

    const request = editing
      ? this.categoryService.update(editing.id, { name })
      : this.categoryService.create({ name });

    request.subscribe({
      next: () => {
        this.message.success(editing ? 'Categoria atualizada com sucesso.' : 'Categoria criada com sucesso.');
        this.isModalVisible.set(false);
        this.load();
      },
      error: () => {
        this.message.error('Não foi possível salvar a categoria.');
      },
    });
  }

  remove(category: ICategory): void {
    this.categoryService.delete(category.id).subscribe({
      next: () => {
        this.message.success('Categoria excluída com sucesso.');
        this.load();
      },
      error: () => {
        this.message.error('Não foi possível excluir a categoria.');
      },
    });
  }
}
