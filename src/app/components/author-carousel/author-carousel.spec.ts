import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorCarousel } from './author-carousel';

describe('AuthorCarousel', () => {
  let component: AuthorCarousel;
  let fixture: ComponentFixture<AuthorCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
