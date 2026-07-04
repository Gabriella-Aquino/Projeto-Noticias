import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { AuthorService } from './author-service';
import { environment } from '../../environments/environment.development';

describe('AuthorService', () => {
  let service: AuthorService;
  let httpMock: HttpTestingController;
  const url = `${environment.supabaseUrl}author`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an author', () => {
    service.create({ name: 'Maria Silva' }).subscribe((author) => {
      expect(author).toEqual({ id: 1, name: 'Maria Silva' });
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush([{ id: 1, name: 'Maria Silva' }]);
  });

  it('should update an author', () => {
    service.update(1, { name: 'Maria S. Souza' }).subscribe((author) => {
      expect(author).toEqual({ id: 1, name: 'Maria S. Souza' });
    });

    const req = httpMock.expectOne(`${url}?id=eq.1`);
    expect(req.request.method).toBe('PATCH');
    req.flush([{ id: 1, name: 'Maria S. Souza' }]);
  });

  it('should delete an author', () => {
    service.delete(1).subscribe();

    const req = httpMock.expectOne(`${url}?id=eq.1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
