import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
import { strongPasswordValidator } from '../../../validators/strong-password-validator';

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

  users = this.userService.users;
  currentUser = this.authService.currentUser;
  isModalVisible = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, strongPasswordValidator]],
    role: ['editor' as 'admin' | 'editor', [Validators.required]],
  });

  passwordErrorMessage(): string {
    const errors: ValidationErrors | null = this.form.controls.password.errors;

    if (errors?.['required']) {
      return 'Informe uma senha.';
    }

    const strongPasswordErrors = errors?.['strongPassword'];
    if (!strongPasswordErrors) {
      return '';
    }

    const missing: string[] = [];
    if (strongPasswordErrors.minLength) missing.push('8 caracteres');
    if (strongPasswordErrors.uppercase) missing.push('1 letra maiúscula');
    if (strongPasswordErrors.lowercase) missing.push('1 letra minúscula');
    if (strongPasswordErrors.number) missing.push('1 número');
    if (strongPasswordErrors.specialChar) missing.push('1 caractere especial');

    return `A senha precisa ter ao menos: ${missing.join(', ')}.`;
  }

  emailErrorMessage(): string {
    const control = this.form.controls.email;
    if (control.hasError('required')) return 'Informe o e-mail.';
    if (control.hasError('email')) return 'Informe um e-mail válido.';
    if (control.hasError('emailTaken')) return 'Já existe um usuário com este e-mail.';
    return '';
  }

  openCreateModal(): void {
    this.form.reset({ name: '', email: '', password: '', role: 'editor' });
    this.isModalVisible.set(true);
  }

  closeModal(): void {
    this.isModalVisible.set(false);
  }

  submit(): void {
    const email = this.form.controls.email.value;
    if (email && this.userService.emailExists(email)) {
      this.form.controls.email.setErrors({ emailTaken: true });
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, password, role } = this.form.getRawValue();
    this.userService.create({ name, email: email!, password, role });
    this.message.success('Usuário cadastrado com sucesso.');
    this.isModalVisible.set(false);
  }

  remove(user: IUser): void {
    if (user.id === this.currentUser()?.id) {
      this.message.error('Você não pode excluir o usuário com o qual está logado.');
      return;
    }

    this.userService.delete(user.id);
    this.message.success('Usuário excluído com sucesso.');
  }
}
