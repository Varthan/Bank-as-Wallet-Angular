import { TestBed, async, inject } from '@angular/core/testing';

import { LoanFdGuard } from './loan-fd.guard';

describe('LoanFdGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoanFdGuard]
    });
  });

  it('should ...', inject([LoanFdGuard], (guard: LoanFdGuard) => {
    expect(guard).toBeTruthy();
  }));
});
