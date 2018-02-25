import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzgsComponent } from './tzgs.component';

describe('TzgsComponent', () => {
  let component: TzgsComponent;
  let fixture: ComponentFixture<TzgsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzgsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
