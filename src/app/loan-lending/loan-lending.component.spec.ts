import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanLendingComponent } from './loan-lending.component';

describe('LoanLendingComponent', () => {
  let component: LoanLendingComponent;
  let fixture: ComponentFixture<LoanLendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanLendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanLendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
