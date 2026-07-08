import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { AdminNews } from './admin-news';
import { environment } from '../../../../environments/environment.development';

describe('AdminNews', () => {
  let component: AdminNews;
  let fixture: ComponentFixture<AdminNews>;
  let httpMock: HttpTestingController;
  const newsUrl = `${environment.supabaseUrl}news`;
  const categoryUrl = `${environment.supabaseUrl}category`;
  const authorUrl = `${environment.supabaseUrl}author`;

  const newsResponse = {
    id: 1,
    title: 'Título',
    subTitle: 'Subtítulo',
    content: 'Conteúdo',
    cover: 'https://img.test/1.png',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_ed: null,
    main: false,
    author_id: 1,
    category_id: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNews],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideNzIconsTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminNews);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    httpMock.expectOne((req) => req.url.startsWith(newsUrl) && req.method === 'GET').flush([newsResponse]);
    httpMock.expectOne(categoryUrl).flush([{ id: 1, name: 'Esportes' }]);
    httpMock.expectOne(authorUrl).flush([{ id: 1, name: 'Maria Silva' }]);
    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create and load news', () => {
    expect(component).toBeTruthy();
    expect(component.news().length).toBe(1);
    expect(component.news()[0].title).toBe('Título');
  });

  it('should resolve category and author names', () => {
    expect(component.categoryName(1)).toBe('Esportes');
    expect(component.authorName(1)).toBe('Maria Silva');
  });

  it('should not submit an invalid form', () => {
    component.openCreateModal();
    component.submit();

    expect(component.form.invalid).toBe(true);
  });

  it('should create a news item and reload the list', () => {
    component.openCreateModal();
    component.form.setValue({
      title: 'Nova notícia',
      subTitle: 'Subtítulo novo',
      content: 'Conteúdo com mais de dez caracteres',
      image: 'https://img.test/2.png',
      category: 1,
      author: 1,
      main: false,
    });

    component.submit();

    const createReq = httpMock.expectOne((req) => req.url.startsWith(newsUrl) && req.method === 'POST');
    createReq.flush([{ ...newsResponse, id: 2, title: 'Nova notícia' }]);

    const reloadReq = httpMock.expectOne((req) => req.url.startsWith(newsUrl) && req.method === 'GET');
    reloadReq.flush([newsResponse, { ...newsResponse, id: 2, title: 'Nova notícia' }]);

    expect(component.news().length).toBe(2);
    expect(component.isModalVisible()).toBe(false);
  });

  it('should delete a news item and reload the list', () => {
    component.remove(component.news()[0]);

    const deleteReq = httpMock.expectOne((req) => req.url.startsWith(`${newsUrl}?id=eq.1`) && req.method === 'DELETE');
    deleteReq.flush(null);

    const reloadReq = httpMock.expectOne((req) => req.url.startsWith(newsUrl) && req.method === 'GET');
    reloadReq.flush([]);

    expect(component.news()).toEqual([]);
  });
});
