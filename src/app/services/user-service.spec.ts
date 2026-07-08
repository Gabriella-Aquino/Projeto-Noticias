import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { UserService } from './user-service';
import { environment } from '../../environments/environment.development';
import { toAuthUrl } from '../utils/supabase-auth-url';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const url = `${environment.supabaseUrl}profiles`;
  const signUpUrl = `${toAuthUrl(environment.supabaseUrl)}signup`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all profiles', () => {
    const profiles = [
      { id: '1', name: 'Administrador', role: 'admin' },
      { id: '2', name: 'Editore', role: 'editor' },
    ];

    service.getAll().subscribe((users) => {
      expect(users).toEqual(profiles);
    });

    const req = httpMock.expectOne(`${url}?select=id,name,role`);
    expect(req.request.method).toBe('GET');
    req.flush(profiles);
  });

  it('should fetch a profile by id', () => {
    const profile = { id: '1', name: 'Administrador', role: 'admin' };

    service.findById('1').subscribe((user) => {
      expect(user).toEqual(profile);
    });

    const req = httpMock.expectOne(`${url}?id=eq.1&select=id,name,role`);
    expect(req.request.method).toBe('GET');
    req.flush([profile]);
  });

  it('should return null when a profile is not found', () => {
    service.findById('missing').subscribe((user) => {
      expect(user).toBeNull();
    });

    const req = httpMock.expectOne(`${url}?id=eq.missing&select=id,name,role`);
    req.flush([]);
  });

  it('should sign up a new user and patch its generated profile', () => {
    service
      .create({ name: 'Novo Usuário', email: 'novo@jornal.com', password: 'Senha@123', role: 'editor' })
      .subscribe((user) => {
        expect(user).toEqual({ id: '3', name: 'Novo Usuário', role: 'editor' });
      });

    const signUpReq = httpMock.expectOne(signUpUrl);
    expect(signUpReq.request.method).toBe('POST');
    expect(signUpReq.request.body).toEqual({ email: 'novo@jornal.com', password: 'Senha@123' });
    signUpReq.flush({ id: '3' });

    const patchReq = httpMock.expectOne(`${url}?id=eq.3`);
    expect(patchReq.request.method).toBe('PATCH');
    expect(patchReq.request.body).toEqual({ name: 'Novo Usuário', role: 'editor' });
    patchReq.flush([{ id: '3', name: 'Novo Usuário', role: 'editor' }]);
  });

  it('should delete a profile', () => {
    service.delete('1').subscribe();

    const req = httpMock.expectOne(`${url}?id=eq.1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
