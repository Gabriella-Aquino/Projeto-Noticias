import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationCard } from './quotation-card';

describe('QuotationCard', () => {
  let component: QuotationCard;
  let fixture: ComponentFixture<QuotationCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationCard],
    }).compileComponents();

    fixture = TestBed.createComponent(QuotationCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
