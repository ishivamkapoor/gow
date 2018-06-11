import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcomponentsComponent } from './detailcomponents.component';

describe('DetailcomponentsComponent', () => {
  let component: DetailcomponentsComponent;
  let fixture: ComponentFixture<DetailcomponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailcomponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailcomponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
