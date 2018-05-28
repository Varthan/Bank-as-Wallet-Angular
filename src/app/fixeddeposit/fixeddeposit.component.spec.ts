import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixeddepositComponent } from './fixeddeposit.component';

describe('FixeddepositComponent', () => {
  let component: FixeddepositComponent;
  let fixture: ComponentFixture<FixeddepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixeddepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixeddepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
