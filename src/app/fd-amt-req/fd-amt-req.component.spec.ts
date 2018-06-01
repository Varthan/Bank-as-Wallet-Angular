import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdAmtReqComponent } from './fd-amt-req.component';

describe('FdAmtReqComponent', () => {
  let component: FdAmtReqComponent;
  let fixture: ComponentFixture<FdAmtReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdAmtReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdAmtReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
