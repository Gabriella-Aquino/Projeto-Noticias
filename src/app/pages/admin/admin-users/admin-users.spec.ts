import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { AdminUsers } from './admin-users';

describe('AdminUsers', () => {
  let component: AdminUsers;
  let fixture: ComponentFixture<AdminUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUsers],
      providers: [provideNzIconsTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUsers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create and load the seeded users', () => {
    expect(component).toBeTruthy();
    expect(component.users().length).toBe(2);
  });

  it('should reject a weak password', () => {
    component.openCreateModal();
    component.form.setValue({
      name: 'Novo Usuário',
      email: 'novo@jornal.com',
      password: 'fraca',
      role: 'editor',
    });

    component.submit();

    expect(component.form.controls.password.invalid).toBe(true);
    expect(component.users().length).toBe(2);
  });

  it('should reject a duplicate email', () => {
    component.openCreateModal();
    component.form.setValue({
      name: 'Outro Admin',
      email: 'admin@jornal.com',
      password: 'Senha@123',
      role: 'admin',
    });

    component.submit();

    expect(component.form.controls.email.hasError('emailTaken')).toBe(true);
    expect(component.users().length).toBe(2);
  });

  it('should create a user with valid data', () => {
    component.openCreateModal();
    component.form.setValue({
      name: 'Novo Usuário',
      email: 'novo@jornal.com',
      password: 'Senha@123',
      role: 'editor',
    });

    component.submit();

    expect(component.users().length).toBe(3);
    expect(component.isModalVisible()).toBe(false);
  });

  it('should delete a user that is not the current session', () => {
    const target = component.users().find((user) => user.email === 'editor@jornal.com')!;
    component.remove(target);

    expect(component.users().length).toBe(1);
  });
});
