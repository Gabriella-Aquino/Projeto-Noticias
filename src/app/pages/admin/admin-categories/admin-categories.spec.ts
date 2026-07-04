import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { AdminCategories } from './admin-categories';
import { environment } from '../../../../environments/environment.development';

describe('AdminCategories', () => {
  let component: AdminCategories;
  let fixture: ComponentFixture<AdminCategories>;
  let httpMock: HttpTestingController;
  const url = `${environment.supabaseUrl}category`;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCategories],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideNzIconsTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCategories);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    httpMock.expectOne(url).flush([{ id: 1, name: 'Esportes' }]);
    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create and load categories', () => {
    expect(component).toBeTruthy();
    expect(component.categories()).toEqual([{ id: 1, name: 'Esportes' }]);
  });

  it('should not submit an invalid form', () => {
    component.openCreateModal();
    component.form.setValue({ name: '' });

    component.submit();

    expect(component.form.invalid).toBe(true);
  });

  it('should create a category and reload the list', () => {
    component.openCreateModal();
    component.form.setValue({ name: 'Política' });

    component.submit();

    const createReq = httpMock.expectOne(url);
    expect(createReq.request.method).toBe('POST');
    createReq.flush([{ id: 2, name: 'Política' }]);

    const reloadReq = httpMock.expectOne(url);
    reloadReq.flush([{ id: 1, name: 'Esportes' }, { id: 2, name: 'Política' }]);

    expect(component.categories().length).toBe(2);
    expect(component.isModalVisible()).toBe(false);
  });

  it('should delete a category and reload the list', () => {
    component.remove({ id: 1, name: 'Esportes' });

    const deleteReq = httpMock.expectOne(`${url}?id=eq.1`);
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush(null);

    const reloadReq = httpMock.expectOne(url);
    reloadReq.flush([]);

    expect(component.categories()).toEqual([]);
  });
});
