import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { AdminUsers } from './admin-users';
import { environment } from '../../../../environments/environment.development';
import { toAuthUrl } from '../../../utils/supabase-auth-url';

describe('AdminUsers', () => {
  let component: AdminUsers;
  let fixture: ComponentFixture<AdminUsers>;
  let httpMock: HttpTestingController;
  const profilesUrl = `${environment.supabaseUrl}profiles`;
  const signUpUrl = `${toAuthUrl(environment.supabaseUrl)}signup`;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUsers],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideNzIconsTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUsers);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    httpMock
      .expectOne(`${profilesUrl}?select=id,name,role`)
      .flush([
        { id: '1', name: 'Administrador', role: 'admin' },
        { id: '2', name: 'Editore', role: 'editor' },
      ]);

    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create and load the profiles', () => {
    expect(component).toBeTruthy();
    expect(component.users().length).toBe(2);
  });

  it('should reject an invalid name', () => {
    component.openCreateModal();
    component.form.setValue({
      name: 'A',
      email: 'novo@jornal.com',
      password: 'Senha@123',
      role: 'editor',
    });

    component.submit();

    expect(component.form.controls.name.invalid).toBe(true);
    expect(component.users().length).toBe(2);
  });

  it('should sign up and patch the profile on create', () => {
    component.openCreateModal();
    component.form.setValue({
      name: 'Novo Usuário',
      email: 'novo@jornal.com',
      password: 'Senha@123',
      role: 'editor',
    });

    component.submit();

    const signUpReq = httpMock.expectOne(signUpUrl);
    expect(signUpReq.request.method).toBe('POST');
    signUpReq.flush({ id: '3' });

    const patchReq = httpMock.expectOne(`${profilesUrl}?id=eq.3`);
    expect(patchReq.request.method).toBe('PATCH');
    expect(patchReq.request.body).toEqual({ name: 'Novo Usuário', role: 'editor' });
    patchReq.flush([{ id: '3', name: 'Novo Usuário', role: 'editor' }]);

    httpMock.expectOne(`${profilesUrl}?select=id,name,role`).flush([
      { id: '1', name: 'Administrador', role: 'admin' },
      { id: '2', name: 'Editore', role: 'editor' },
      { id: '3', name: 'Novo Usuário', role: 'editor' },
    ]);

    expect(component.isModalVisible()).toBe(false);
    expect(component.users().length).toBe(3);
  });

  it('should delete a user that is not the current session', () => {
    const target = component.users().find((user) => user.id === '2')!;
    component.remove(target);

    const req = httpMock.expectOne(`${profilesUrl}?id=eq.2`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);

    httpMock.expectOne(`${profilesUrl}?select=id,name,role`).flush([
      { id: '1', name: 'Administrador', role: 'admin' },
    ]);

    expect(component.users().length).toBe(1);
  });
});
