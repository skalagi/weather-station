import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxtForecastComponent } from './txt-forecast.component';

describe('TxtForecastComponent', () => {
  let component: TxtForecastComponent;
  let fixture: ComponentFixture<TxtForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxtForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxtForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
