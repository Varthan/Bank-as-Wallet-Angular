import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanReqComponent } from './loan-req.component';

describe('LoanReqComponent', () => {
  let component: LoanReqComponent;
  let fixture: ComponentFixture<LoanReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
