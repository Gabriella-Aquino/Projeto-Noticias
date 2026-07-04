import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { adminGuard } from './admin-guard';
import { AuthService } from '../services/auth-service';

describe('adminGuard', () => {
  it('should allow access for admins', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: { isAdmin: () => true } }],
    });

    const result = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));

    expect(result).toBe(true);
  });

  it('should redirect non-admins to /admin', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: { isAdmin: () => false } }],
    });

    const result = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));

    const router = TestBed.inject(Router);
    expect(result).toEqual(router.createUrlTree(['/admin']));
  });
});
