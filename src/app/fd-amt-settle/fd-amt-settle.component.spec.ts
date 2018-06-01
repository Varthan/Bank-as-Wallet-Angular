import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdAmtSettleComponent } from './fd-amt-settle.component';

describe('FdAmtSettleComponent', () => {
  let component: FdAmtSettleComponent;
  let fixture: ComponentFixture<FdAmtSettleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdAmtSettleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdAmtSettleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
