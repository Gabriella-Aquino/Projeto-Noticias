import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { AdminUsers } from './admin-users';
import { environment } from '../../../../environments/environment.development';

describe('AdminUsers', () => {
  let component: AdminUsers;
  let fixture: ComponentFixture<AdminUsers>;
  let httpMock: HttpTestingController;
  const profilesUrl = `${environment.supabaseUrl}profiles`;

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
    component.form.setValue({ name: 'A', role: 'editor' });

    component.submit();

    expect(component.form.controls.name.invalid).toBe(true);
    expect(component.users().length).toBe(2);
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
