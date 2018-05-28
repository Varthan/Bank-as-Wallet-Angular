import { TestBed, async, inject } from '@angular/core/testing';

import { ReguserGuard } from './reguser.guard';

describe('ReguserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReguserGuard]
    });
  });

  it('should ...', inject([ReguserGuard], (guard: ReguserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
