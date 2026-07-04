import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth-guard';
import { AuthService } from '../services/auth-service';

describe('authGuard', () => {
  it('should allow access when logged in', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: { isLoggedIn: () => true } }],
    });

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, { url: '/admin' } as any)
    );

    expect(result).toBe(true);
  });

  it('should redirect to /login when logged out', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: { isLoggedIn: () => false } }],
    });

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, { url: '/admin' } as any)
    );

    const router = TestBed.inject(Router);
    expect(result).toEqual(router.createUrlTree(['/login'], { queryParams: { redirectTo: '/admin' } }));
  });
});
