import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanpayComponent } from './loanpay.component';

describe('LoanpayComponent', () => {
  let component: LoanpayComponent;
  let fixture: ComponentFixture<LoanpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
