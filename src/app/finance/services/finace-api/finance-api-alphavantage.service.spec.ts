import { TestBed } from '@angular/core/testing';

import { FinanceApiAlphavantageService } from './finance-api-alphavantage.service';

describe('FinanceApiAlphavantageService', () => {
  let service: FinanceApiAlphavantageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceApiAlphavantageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
