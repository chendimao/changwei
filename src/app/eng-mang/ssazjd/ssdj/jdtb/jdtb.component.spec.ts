import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JdtbComponent } from './jdtb.component';

describe('JdtbComponent', () => {
  let component: JdtbComponent;
  let fixture: ComponentFixture<JdtbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdtbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JdtbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
