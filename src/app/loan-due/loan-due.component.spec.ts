import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDueComponent } from './loan-due.component';

describe('LoanDueComponent', () => {
  let component: LoanDueComponent;
  let fixture: ComponentFixture<LoanDueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanDueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
