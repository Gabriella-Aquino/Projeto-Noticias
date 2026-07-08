import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthorService } from '../../../services/author-service';
import { StorageService } from '../../../services/storage-service';
import { IAuthor } from '../../../types/author';

@Component({
  selector: 'app-admin-authors',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzRadioModule,
    NzPopconfirmModule,
  ],
  templateUrl: './admin-authors.html',
  styleUrl: './admin-authors.scss',
})
export class AdminAuthors {
  private authorService = inject(AuthorService);
  private storageService = inject(StorageService);
  private message = inject(NzMessageService);
  private fb = inject(FormBuilder);

  authors = signal<IAuthor[]>([]);
  loading = signal(false);
  isModalVisible = signal(false);
  editingAuthor = signal<IAuthor | null>(null);
  avatarSource = signal<'url' | 'file'>('url');
  uploadingAvatar = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    avatar: [''],
  });

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.authorService.getAll().subscribe({
      next: (authors) => {
        this.authors.set(authors);
        this.loading.set(false);
      },
      error: () => {
        this.message.error('Não foi possível carregar os autores.');
        this.loading.set(false);
      },
    });
  }

  openCreateModal(): void {
    this.editingAuthor.set(null);
    this.avatarSource.set('url');
    this.uploadingAvatar.set(false);
    this.form.reset({ name: '', avatar: '' });
    this.isModalVisible.set(true);
  }

  openEditModal(author: IAuthor): void {
    this.editingAuthor.set(author);
    this.avatarSource.set('url');
    this.uploadingAvatar.set(false);
    this.form.reset({ name: author.name, avatar: author.avatar ?? '' });
    this.isModalVisible.set(true);
  }

  closeModal(): void {
    this.isModalVisible.set(false);
  }

  onAvatarFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    this.uploadingAvatar.set(true);
    this.storageService.uploadImage(file, 'Author').subscribe({
      next: (url) => {
        this.form.controls.avatar.setValue(url);
        this.uploadingAvatar.set(false);
      },
      error: () => {
        this.message.error('Não foi possível enviar o avatar.');
        this.uploadingAvatar.set(false);
      },
    });
  }

  submit(): void {
    if (this.uploadingAvatar()) {
      this.message.warning('Aguarde o envio da imagem terminar.');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, avatar } = this.form.getRawValue();
    const payload = { name, avatar: avatar || undefined };
    const editing = this.editingAuthor();

    const request = editing
      ? this.authorService.update(editing.id, payload)
      : this.authorService.create(payload);

    request.subscribe({
      next: () => {
        this.message.success(editing ? 'Autor atualizado com sucesso.' : 'Autor criado com sucesso.');
        this.isModalVisible.set(false);
        this.load();
      },
      error: () => {
        this.message.error('Não foi possível salvar o autor.');
      },
    });
  }

  remove(author: IAuthor): void {
    this.authorService.delete(author.id).subscribe({
      next: () => {
        this.message.success('Autor excluído com sucesso.');
        this.load();
      },
      error: () => {
        this.message.error('Não foi possível excluir o autor.');
      },
    });
  }
}
