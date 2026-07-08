import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { CategoryService } from './category';
import { environment } from '../../environments/environment.development';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;
  const url = `${environment.supabaseUrl}category`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a category', () => {
    service.create({ name: 'Esportes' }).subscribe((category) => {
      expect(category).toEqual({ id: 1, name: 'Esportes' });
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush([{ id: 1, name: 'Esportes' }]);
  });

  it('should update a category', () => {
    service.update(1, { name: 'Política' }).subscribe((category) => {
      expect(category).toEqual({ id: 1, name: 'Política' });
    });

    const req = httpMock.expectOne(`${url}?id=eq.1`);
    expect(req.request.method).toBe('PATCH');
    req.flush([{ id: 1, name: 'Política' }]);
  });

  it('should delete a category', () => {
    service.delete(1).subscribe();

    const req = httpMock.expectOne(`${url}?id=eq.1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
