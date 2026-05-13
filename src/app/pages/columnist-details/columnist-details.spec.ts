import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnistDetails } from './columnist-details';

describe('ColumnistDetails', () => {
  let component: ColumnistDetails;
  let fixture: ComponentFixture<ColumnistDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnistDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnistDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
