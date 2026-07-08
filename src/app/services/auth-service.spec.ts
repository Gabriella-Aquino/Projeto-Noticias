import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start logged out', () => {
    expect(service.isLoggedIn()).toBe(false);
    expect(service.currentUser()).toBeNull();
  });

  it('should log in with valid credentials', () => {
    const result = service.login('admin@jornal.com', 'Admin@123');

    expect(result).toBe(true);
    expect(service.isLoggedIn()).toBe(true);
    expect(service.isAdmin()).toBe(true);
    expect(service.currentUser()?.email).toBe('admin@jornal.com');
  });

  it('should reject invalid credentials', () => {
    const result = service.login('admin@jornal.com', 'wrong-password');

    expect(result).toBe(false);
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should identify non-admin roles', () => {
    service.login('editor@jornal.com', 'Editor@123');
    expect(service.isAdmin()).toBe(false);
  });

  it('should log out', () => {
    service.login('admin@jornal.com', 'Admin@123');
    service.logout();

    expect(service.isLoggedIn()).toBe(false);
    expect(sessionStorage.getItem('projeto-noticias:currentUserId')).toBeNull();
  });
});
