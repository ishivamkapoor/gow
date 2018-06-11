import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysflightComponent } from './todaysflight.component';

describe('TodaysflightComponent', () => {
  let component: TodaysflightComponent;
  let fixture: ComponentFixture<TodaysflightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysflightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysflightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
