import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KcqlssqkComponent } from './kcqlssqk.component';

describe('KcqlssqkComponent', () => {
  let component: KcqlssqkComponent;
  let fixture: ComponentFixture<KcqlssqkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KcqlssqkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KcqlssqkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
