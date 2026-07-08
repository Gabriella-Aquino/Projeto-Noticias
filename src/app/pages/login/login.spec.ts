import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { Login } from './login';
import { AuthService } from '../../services/auth-service';

describe('Login', () => {
  let component: Login;
  let authService: { login: ReturnType<typeof vi.fn> };
  let router: Router;

  beforeEach(async () => {
    authService = { login: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        provideNzIconsTesting(),
        { provide: AuthService, useValue: authService },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: convertToParamMap({}) } },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit when form is invalid', () => {
    component.submit();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should show an error message on invalid credentials', () => {
    authService.login.mockReturnValue(false);
    component.form.setValue({ email: 'admin@jornal.com', password: 'wrong' });

    component.submit();

    expect(component.errorMessage()).toBe('E-mail ou senha inválidos.');
  });

  it('should navigate to /admin on successful login', () => {
    authService.login.mockReturnValue(true);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl');
    component.form.setValue({ email: 'admin@jornal.com', password: 'Admin@123' });

    component.submit();

    expect(navigateSpy).toHaveBeenCalledWith('/admin');
  });
});
