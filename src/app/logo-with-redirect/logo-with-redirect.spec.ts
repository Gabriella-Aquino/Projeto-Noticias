import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoWithRedirect } from './logo-with-redirect';

describe('LogoWithRedirect', () => {
  let component: LogoWithRedirect;
  let fixture: ComponentFixture<LogoWithRedirect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoWithRedirect],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoWithRedirect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
