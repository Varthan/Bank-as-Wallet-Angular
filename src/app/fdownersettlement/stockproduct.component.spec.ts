import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockproductComponent } from './stockproduct.component';

describe('StockproductComponent', () => {
  let component: StockproductComponent;
  let fixture: ComponentFixture<StockproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
