import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixDepComponent } from './fix-dep.component';

describe('FixDepComponent', () => {
  let component: FixDepComponent;
  let fixture: ComponentFixture<FixDepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixDepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
