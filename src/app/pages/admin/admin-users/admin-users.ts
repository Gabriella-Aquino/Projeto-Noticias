import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../../../services/user-service';
import { AuthService } from '../../../services/auth-service';
import { IUser } from '../../../types/user';

@Component({
  selector: 'app-admin-users',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzTagModule,
    NzPopconfirmModule,
  ],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss',
})
export class AdminUsers {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private message = inject(NzMessageService);
  private fb = inject(FormBuilder);

  users = signal<IUser[]>([]);
  currentUser = this.authService.currentUser;
  isModalVisible = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    role: ['editor' as 'admin' | 'editor', [Validators.required]],
  });

  constructor() {
    this.refresh();
  }

  openCreateModal(): void {
    this.form.reset({ name: '', role: 'editor' });
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

    const { name, role } = this.form.getRawValue();
    this.userService.create({ name, role }).subscribe((user) => {
      if (!user) {
        this.message.warning('Cadastro de usuários ainda não está disponível.');
        return;
      }

      this.message.success('Usuário cadastrado com sucesso.');
      this.isModalVisible.set(false);
      this.refresh();
    });
  }

  remove(user: IUser): void {
    if (user.id === this.currentUser()?.id) {
      this.message.error('Você não pode excluir o usuário com o qual está logado.');
      return;
    }

    this.userService.delete(user.id).subscribe(() => {
      this.message.success('Usuário excluído com sucesso.');
      this.refresh();
    });
  }

  private refresh(): void {
    this.userService.getAll().subscribe((users) => this.users.set(users));
  }
}
