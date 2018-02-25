import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YsqkComponent } from './ysqk.component';

describe('YsqkComponent', () => {
  let component: YsqkComponent;
  let fixture: ComponentFixture<YsqkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YsqkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YsqkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
