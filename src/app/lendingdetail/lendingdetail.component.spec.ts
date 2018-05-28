import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LendingdetailComponent } from './lendingdetail.component';

describe('LendingdetailComponent', () => {
  let component: LendingdetailComponent;
  let fixture: ComponentFixture<LendingdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LendingdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendingdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
