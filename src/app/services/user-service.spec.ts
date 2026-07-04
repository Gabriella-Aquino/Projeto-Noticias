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

  it('should seed admin and editor users', () => {
    expect(service.getAll().length).toBe(2);
    expect(service.findByEmail('admin@jornal.com')?.role).toBe('admin');
  });

  it('should create a new user with an incremented id', () => {
    const created = service.create({
      name: 'Novo Usuário',
      email: 'novo@jornal.com',
      password: 'Senha@123',
      role: 'editor',
    });

    expect(created.id).toBe(3);
    expect(service.getAll().length).toBe(3);
  });

  it('should delete a user', () => {
    service.delete(2);
    expect(service.findById(2)).toBeUndefined();
    expect(service.getAll().length).toBe(1);
  });

  it('should detect duplicate emails', () => {
    expect(service.emailExists('admin@jornal.com')).toBe(true);
    expect(service.emailExists('admin@jornal.com', 1)).toBe(false);
    expect(service.emailExists('inexistente@jornal.com')).toBe(false);
  });
});
