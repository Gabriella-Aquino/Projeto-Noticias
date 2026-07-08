import { TestBed } from '@angular/core/testing';

import { UserService } from './user-service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should seed admin and editor users with uuid ids', () => {
    const users = service.getAll();

    expect(users.length).toBe(2);
    expect(service.findByEmail('admin@jornal.com')?.role).toBe('admin');
    expect(typeof users[0].id).toBe('string');
  });

  it('should create a new user with a generated uuid', () => {
    const created = service.create({
      name: 'Novo Usuário',
      email: 'novo@jornal.com',
      password: 'Senha@123',
      role: 'editor',
    });

    expect(created.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(service.getAll().length).toBe(3);
  });

  it('should delete a user', () => {
    const editor = service.findByEmail('editor@jornal.com')!;
    service.delete(editor.id);

    expect(service.findById(editor.id)).toBeUndefined();
    expect(service.getAll().length).toBe(1);
  });

  it('should detect duplicate emails', () => {
    const admin = service.findByEmail('admin@jornal.com')!;

    expect(service.emailExists('admin@jornal.com')).toBe(true);
    expect(service.emailExists('admin@jornal.com', admin.id)).toBe(false);
    expect(service.emailExists('inexistente@jornal.com')).toBe(false);
  });
});
