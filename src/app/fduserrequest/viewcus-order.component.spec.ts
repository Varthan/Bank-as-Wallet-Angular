import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcusOrderComponent } from './viewcus-order.component';

describe('ViewcusOrderComponent', () => {
  let component: ViewcusOrderComponent;
  let fixture: ComponentFixture<ViewcusOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcusOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcusOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
