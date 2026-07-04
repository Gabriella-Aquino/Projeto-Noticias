import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { AdminAuthors } from './admin-authors';
import { environment } from '../../../../environments/environment.development';

describe('AdminAuthors', () => {
  let component: AdminAuthors;
  let fixture: ComponentFixture<AdminAuthors>;
  let httpMock: HttpTestingController;
  const url = `${environment.supabaseUrl}author`;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAuthors],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideNzIconsTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAuthors);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    httpMock.expectOne(url).flush([{ id: 1, name: 'Maria Silva' }]);
    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create and load authors', () => {
    expect(component).toBeTruthy();
    expect(component.authors()).toEqual([{ id: 1, name: 'Maria Silva' }]);
  });

  it('should not submit an invalid form', () => {
    component.openCreateModal();
    component.form.setValue({ name: '', avatar: '' });

    component.submit();

    expect(component.form.invalid).toBe(true);
  });

  it('should create an author and reload the list', () => {
    component.openCreateModal();
    component.form.setValue({ name: 'João Souza', avatar: '' });

    component.submit();

    const createReq = httpMock.expectOne(url);
    expect(createReq.request.method).toBe('POST');
    createReq.flush([{ id: 2, name: 'João Souza' }]);

    const reloadReq = httpMock.expectOne(url);
    reloadReq.flush([{ id: 1, name: 'Maria Silva' }, { id: 2, name: 'João Souza' }]);

    expect(component.authors().length).toBe(2);
    expect(component.isModalVisible()).toBe(false);
  });

  it('should delete an author and reload the list', () => {
    component.remove({ id: 1, name: 'Maria Silva' });

    const deleteReq = httpMock.expectOne(`${url}?id=eq.1`);
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush(null);

    const reloadReq = httpMock.expectOne(url);
    reloadReq.flush([]);

    expect(component.authors()).toEqual([]);
  });
});
